import dbConnect from '@/lib/mongodb';
import Booking from '@/models/booking';
import { NextRequest, NextResponse } from 'next/server';
import { CACHE_DURATIONS } from '@/lib/constants';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');
  
  if (!date) {
    return NextResponse.json(
      { error: 'Date parameter is required' },
      { status: 400 }
    );
  }

  try {
    await dbConnect();
    
    const isBooked = await Booking.isDateBooked(new Date(date));
    
    const response = NextResponse.json({ isBooked });
    
    response.headers.set('Cache-Control', `public, max-age=${CACHE_DURATIONS.DATE_CHECK}`);
    response.headers.set('ETag', `"${date}-${isBooked}"`);
    
    return response;
  } catch (error) {
    console.error('Error checking availability:', error);
    return NextResponse.json(
      { error: 'Failed to check availability' },
      { status: 500 }
    );
  }
}