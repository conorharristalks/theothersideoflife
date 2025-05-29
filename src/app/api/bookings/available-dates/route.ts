import dbConnect from '@/lib/mongodb';
import Booking from '@/models/booking';
import { NextRequest, NextResponse } from 'next/server';
import { CACHE_DURATIONS } from '@/lib/constants';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get('year');
    const month = searchParams.get('month');
    const excludeToken = searchParams.get('excludeToken'); // Add this parameter
    
    if (!year || !month) {
      return NextResponse.json(
        { error: 'Year and month parameters are required' },
        { status: 400 }
      );
    }

    const yearNum = parseInt(year);
    const monthNum = parseInt(month);

    if (isNaN(yearNum) || isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
      return NextResponse.json(
        { error: 'Invalid year or month parameters' },
        { status: 400 }
      );
    }

    await dbConnect();
    
    const startDate = new Date(yearNum, monthNum - 1, 1);
    const endDate = new Date(yearNum, monthNum, 0, 23, 59, 59, 999);
    
    // Build query to exclude current booking if editing
    interface BookingQuery {
      date: {
        $gte: Date;
        $lte: Date;
      };
      editToken?: {
        $ne: string;
      };
    }
    
    const query: BookingQuery = {
      date: {
        $gte: startDate,
        $lte: endDate
      }
    };
    
    // If excludeToken is provided, exclude that booking from the results
    if (excludeToken) {
      query.editToken = { $ne: excludeToken };
    }
    
    const bookings = await Booking.find(query).select('date -_id').lean().exec();
    
    // Extract dates with more careful formatting to avoid timezone issues
    const bookedDates = bookings.map(booking => {
      const date = new Date(booking.date);
      // Format as YYYY-MM-DD in UTC to be consistent
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, '0');
      const day = String(date.getUTCDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    });
    
    const response = NextResponse.json({ bookedDates });
    
    // Adjust cache headers when excluding a booking to ensure fresh data
    if (excludeToken) {
      response.headers.set('Cache-Control', 'no-cache, must-revalidate');
    } else {
      response.headers.set('Cache-Control', `public, max-age=${CACHE_DURATIONS.AVAILABILITY_BROWSER}, s-maxage=${CACHE_DURATIONS.AVAILABILITY_CDN}`);
    }
    response.headers.set('ETag', `"${year}-${month}-${bookedDates.length}-${excludeToken || 'none'}"`);
    
    return response;
  } catch (error) {
    console.error('Error fetching available dates:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch available dates',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}