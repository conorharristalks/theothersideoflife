import dbConnect from '@/lib/mongodb';
import Booking from '@/models/booking';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const excludeToken = searchParams.get('excludeToken');
    
    if (!date) {
      return NextResponse.json(
        { error: 'Date parameter is required' },
        { status: 400 }
      );
    }

    // Validate the date format
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format' },
        { status: 400 }
      );
    }

    await dbConnect();
    
    // Check if the specific date is booked, excluding current booking if editing
    const year = parsedDate.getUTCFullYear();
    const month = parsedDate.getUTCMonth();
    const day = parsedDate.getUTCDate();
    
    const startOfDay = new Date(Date.UTC(year, month, day, 0, 0, 0));
    const endOfDay = new Date(Date.UTC(year, month, day, 23, 59, 59, 999));
    
    let query: any = {
      date: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    };
    
    // Exclude current booking if editing
    if (excludeToken) {
      query.editToken = { $ne: excludeToken };
    }
    
    const existingBooking = await Booking.findOne(query);
    const isBooked = !!existingBooking;
    
    const responseData = { 
      date,
      isBooked,
      excludeToken: excludeToken || null,
      // Include parsed date information for debugging
      parsedDate: {
        iso: parsedDate.toISOString(),
        year: parsedDate.getFullYear(),
        month: parsedDate.getMonth() + 1,
        day: parsedDate.getDate()
      }
    };
    
    // Create response with caching headers
    const response = NextResponse.json(responseData);
    
    // Adjust cache headers when excluding a booking
    if (excludeToken) {
      response.headers.set('Cache-Control', 'no-cache, must-revalidate');
    } else {
      response.headers.set('Cache-Control', 'public, max-age=120');
    }
    response.headers.set('ETag', `"${date}-${isBooked}-${excludeToken || 'none'}"`);
    
    return response;
  } catch (error) {
    console.error('Error checking date availability:', error);
    return NextResponse.json(
      { 
        error: 'Failed to check date availability',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
