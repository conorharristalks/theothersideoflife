import dbConnect from '@/lib/mongodb';
import Booking from '@/models/booking';
import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'wellbeing2024';

function validatePassword(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }
  
  const password = authHeader.substring(7);
  return password === ADMIN_PASSWORD;
}

// Block a date
export async function POST(request: NextRequest) {
  if (!validatePassword(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { date } = await request.json();
    
    if (!date) {
      return NextResponse.json({ error: 'Date is required' }, { status: 400 });
    }

    await dbConnect();

    // Fix: Parse the date as UTC and use UTC methods to standardize
    const blockDate = new Date(date);
    
    // This is the key fix - use UTC methods to get year, month, day
    const standardizedDate = new Date(
      Date.UTC(
        blockDate.getUTCFullYear(),
        blockDate.getUTCMonth(),
        blockDate.getUTCDate(),
        12, 0, 0
      )
    );

    console.log('Blocking date:', {
      originalDate: date,
      parsedDate: blockDate.toISOString(),
      standardizedDate: standardizedDate.toISOString(),
      day: standardizedDate.getUTCDate(),
      month: standardizedDate.getUTCMonth() + 1,
      year: standardizedDate.getUTCFullYear()
    });

    // Check if date is already booked/blocked using proper date range
    const year = standardizedDate.getUTCFullYear();
    const month = standardizedDate.getUTCMonth();
    const day = standardizedDate.getUTCDate();
    
    const startOfDay = new Date(Date.UTC(year, month, day, 0, 0, 0));
    const endOfDay = new Date(Date.UTC(year, month, day, 23, 59, 59, 999));

    console.log('Checking for existing bookings in range:', {
      startOfDay: startOfDay.toISOString(),
      endOfDay: endOfDay.toISOString()
    });

    const existingBooking = await Booking.findOne({
      date: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    });

    if (existingBooking) {
      console.log('Found existing booking:', {
        id: existingBooking._id,
        date: existingBooking.date.toISOString(),
        isBlocked: existingBooking.isBlocked,
        schoolName: existingBooking.schoolName
      });
      
      if (existingBooking.isBlocked) {
        return NextResponse.json({ error: 'Date is already blocked' }, { status: 409 });
      } else {
        return NextResponse.json({ error: 'Date is already booked by a school' }, { status: 409 });
      }
    }

    // Create blocked date directly instead of using the helper method
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
    
    console.log('Successfully blocked date:', {
      id: savedBooking._id,
      date: savedBooking.date.toISOString(),
      day: savedBooking.date.getUTCDate()
    });

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
    
    // Handle validation errors specifically
    if (error && typeof error === 'object' && 'name' in error && error.name === 'ValidationError' && 'errors' in error) {
      const validationError = error as { errors: Record<string, { message: string }> };
      const errorMessages = Object.values(validationError.errors).map((err) => err.message);
      return NextResponse.json({ 
        error: 'Validation failed: ' + errorMessages.join(', ') 
      }, { status: 400 });
    }
    
    // Handle duplicate key error
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
  if (!validatePassword(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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

    // Delete only blocked dates (not regular bookings)
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
  if (!validatePassword(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
