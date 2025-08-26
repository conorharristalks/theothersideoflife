import dbConnect from '@/lib/mongodb';
import Booking from '@/models/booking';
import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { adminRateLimiter } from '@/lib/rate-limiter';
import { getClientIP, formatDuration } from '@/lib/utils';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

function validatePassword(request: NextRequest): { valid: boolean; clientIP: string } {
  const clientIP = getClientIP(request);
  
  // Check if IP is currently blocked
  if (adminRateLimiter.isBlocked(clientIP)) {
    return { valid: false, clientIP };
  }

  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { valid: false, clientIP };
  }
  
  const password = authHeader.substring(7);
  const isValid = password === ADMIN_PASSWORD;
  
  // Record the attempt
  adminRateLimiter.recordAttempt(clientIP, isValid);
  
  return { valid: isValid, clientIP };
}

// Block a date
export async function POST(request: NextRequest) {
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
    const { date } = await request.json();
    
    if (!date) {
      return NextResponse.json({ error: 'Date is required' }, { status: 400 });
    }

    await dbConnect();

    const blockDate = new Date(date);
    
    const standardizedDate = new Date(
      Date.UTC(
        blockDate.getUTCFullYear(),
        blockDate.getUTCMonth(),
        blockDate.getUTCDate(),
        12, 0, 0
      )
    );

    const year = standardizedDate.getUTCFullYear();
    const month = standardizedDate.getUTCMonth();
    const day = standardizedDate.getUTCDate();
    
    const startOfDay = new Date(Date.UTC(year, month, day, 0, 0, 0));
    const endOfDay = new Date(Date.UTC(year, month, day, 23, 59, 59, 999));

    const existingBooking = await Booking.findOne({
      date: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    });

    if (existingBooking) {
      if (existingBooking.isBlocked) {
        return NextResponse.json({ error: 'Date is already blocked' }, { status: 409 });
      } else {
        return NextResponse.json({ error: 'Date is already booked by a school' }, { status: 409 });
      }
    }

    const blockedBooking = new Booking({
      date: standardizedDate,
      timeSlot: 'BLOCKED',
      schoolName: 'ADMIN_BLOCKED',
      contactName: 'System Admin',
      email: 'admin@blocked.system',
      phone: 'N/A',
      address: 'N/A',
      city: 'N/A',
      numberOfTalks: 0,
      editToken: randomBytes(32).toString('hex'),
      isBlocked: true,
      blockReason: 'Unavailable'
    });

    const savedBooking = await blockedBooking.save();

    return NextResponse.json({ 
      success: true, 
      message: 'Date blocked successfully',
      blockedDate: {
        date: savedBooking.date.toISOString(),
        day: savedBooking.date.getUTCDate()
      }
    });

  } catch (error: unknown) {
    console.error('Error blocking date:', error);
    
    if (error && typeof error === 'object' && 'name' in error && error.name === 'ValidationError' && 'errors' in error) {
      const validationError = error as { errors: Record<string, { message: string }> };
      const errorMessages = Object.values(validationError.errors).map((err) => err.message);
      return NextResponse.json({ 
        error: 'Validation failed: ' + errorMessages.join(', ') 
      }, { status: 400 });
    }
    
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      return NextResponse.json({ 
        error: 'Date is already booked or blocked' 
      }, { status: 409 });
    }
    
    return NextResponse.json({ 
      error: 'Failed to block date',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Unblock a date
export async function DELETE(request: NextRequest) {
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
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    
    if (!date) {
      return NextResponse.json({ error: 'Date parameter is required' }, { status: 400 });
    }

    await dbConnect();

    const blockDate = new Date(date);
    const year = blockDate.getUTCFullYear();
    const month = blockDate.getUTCMonth();
    const day = blockDate.getUTCDate();
    
    const startOfDay = new Date(Date.UTC(year, month, day, 0, 0, 0));
    const endOfDay = new Date(Date.UTC(year, month, day, 23, 59, 59, 999));

    const result = await Booking.findOneAndDelete({
      isBlocked: true,
      date: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    });

    if (!result) {
      return NextResponse.json({ error: 'Blocked date not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Date unblocked successfully' });

  } catch (error: unknown) {
    console.error('Error unblocking date:', error);
    return NextResponse.json({ 
      error: 'Failed to unblock date',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Get all blocked dates
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

    const blockedDates = await Booking.find({ isBlocked: true })
      .select('date -_id')
      .sort({ date: 1 });

    return NextResponse.json({ 
      blockedDates: blockedDates.map(blocked => ({
        date: blocked.date.toISOString().split('T')[0]
      }))
    });

  } catch (error: unknown) {
    console.error('Error fetching blocked dates:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch blocked dates',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
