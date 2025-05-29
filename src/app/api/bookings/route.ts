import dbConnect from '@/lib/mongodb';
import Booking, { IBooking } from '@/models/booking';
import { sendBookingConfirmation } from '@/lib/email-service';
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

interface BookingRequestBody {
  date: string;
  timeSlot: string;
  schoolName: string;
  contactName: string;
  email: string;
  phone: string; // This will now include country code
  address: string;
  city: string;
  numberOfTalks: number;
  includeWorkshop: boolean;
}

// Create a new booking
export async function POST(request: NextRequest) {
  try {
    const body: BookingRequestBody = await request.json();
    
    // Validate required fields with proper typing
    const requiredFields: (keyof BookingRequestBody)[] = [
      'date', 'timeSlot', 'schoolName', 'contactName', 
      'email', 'phone', 'address', 'city', 'numberOfTalks'
    ];
    
    const missingFields = requiredFields.filter(field => {
      const value = body[field];
      return value === undefined || value === null || value === '';
    });
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }
    
    // Validate number of talks
    if (body.numberOfTalks < 1 || body.numberOfTalks > 5) {
      return NextResponse.json(
        { error: 'Number of talks must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Additional phone validation
    if (!body.phone || body.phone.trim().length < 7) {
      return NextResponse.json(
        { error: 'Please provide a valid phone number' },
        { status: 400 }
      );
    }

    await dbConnect();
    
    // Parse date and standardize to start of day in UTC to avoid timezone issues
    const bookingDate = new Date(body.date);
    // Set time to noon to avoid timezone-related date shifting
    const standardizedDate = new Date(
      Date.UTC(
        bookingDate.getFullYear(),
        bookingDate.getMonth(),
        bookingDate.getDate(),
        12, 0, 0
      )
    );
    
    // Check if date is already booked using the standardized date
    const isDateBooked = await Booking.isDateBooked(standardizedDate);
    if (isDateBooked) {
      return NextResponse.json(
        { error: 'This date is already booked. Please select a different date.' },
        { status: 409 }
      );
    }
    
    // Generate a secure token for editing/canceling the booking
    const editToken = require('crypto').randomBytes(32).toString('hex');
    
    // Create the new booking with the standardized date
    const booking = new Booking({
      ...body,
      date: standardizedDate,
      editToken
    });
    
    await booking.save();
    
    // Send confirmation email
    const emailResult = await sendBookingConfirmation(booking);
    
    return NextResponse.json({
      success: true,
      booking: {
        ...booking.toObject(),
        _id: (booking._id as mongoose.Types.ObjectId).toString(),
        editToken: undefined, // Don't expose the token in the response
      },
      emailSent: emailResult.success
    }, { status: 201 });
    
  } catch (error: unknown) {
    console.error('Error creating booking:', error);
    
    // Type guard for MongoDB duplicate key error
    const isMongoError = (err: unknown): err is { code: number; keyPattern?: Record<string, any> } => {
      return typeof err === 'object' && err !== null && 'code' in err;
    };
    
    // Check for duplicate key error (date already booked)
    if (isMongoError(error) && error.code === 11000 && error.keyPattern && 'date' in error.keyPattern) {
      return NextResponse.json(
        { error: 'This date is already booked. Please select a different date.' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

// Get all bookings (for admin use)
export async function GET() {
  try {
    await dbConnect();
    
    // Find all bookings and sort by date
    const bookings = await Booking.find({})
      .sort({ date: 1 })
      .select('-editToken'); // Don't include edit tokens in the response
    
    return NextResponse.json({ bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}