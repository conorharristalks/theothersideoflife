import dbConnect from '@/lib/mongodb';
import Booking from '@/models/booking';
import { NextRequest, NextResponse } from 'next/server';
import { adminRateLimiter } from '@/lib/rate-limiter';
import { getClientIP, formatDuration } from '@/lib/utils';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

function validatePassword(request: NextRequest): { valid: boolean; clientIP: string } {
  const clientIP = getClientIP(request);
  
  if (adminRateLimiter.isBlocked(clientIP)) {
    return { valid: false, clientIP };
  }

  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { valid: false, clientIP };
  }
  
  const password = authHeader.substring(7);
  const isValid = password === ADMIN_PASSWORD;
  
  adminRateLimiter.recordAttempt(clientIP, isValid);
  
  return { valid: isValid, clientIP };
}

// Get all bookings and blocked dates
export async function GET(request: NextRequest) {
  const { valid: isAuthenticated, clientIP } = validatePassword(request);
  
  if (!isAuthenticated) {
    const status = adminRateLimiter.getStatus(clientIP);
    
    if (status.blocked) {
      const remainingTime = formatDuration(status.remainingBlockTime);
      return NextResponse.json({ 
        error: `Too many failed attempts. IP blocked for ${remainingTime}. Please try again later.`,
        blocked: true,
        remainingBlockTime: status.remainingBlockTime
      }, { status: 429 });
    }
    
    return NextResponse.json({ 
      error: 'Unauthorized',
      remainingAttempts: status.remainingAttempts 
    }, { status: 401 });
  }

  try {
    await dbConnect();

    const allBookings = await Booking.find({})
      .select('date schoolName contactName isBlocked blockReason -_id')
      .sort({ date: 1 });

    return NextResponse.json({ 
      bookings: allBookings.map(booking => ({
        date: booking.date.toISOString().split('T')[0],
        schoolName: booking.schoolName,
        contactName: booking.contactName,
        isBlocked: booking.isBlocked || false,
        blockReason: booking.blockReason
      }))
    });

  } catch (error: unknown) {
    console.error('Error fetching all bookings:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch bookings',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
