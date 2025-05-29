import dbConnect from '@/lib/mongodb';
import Booking, { IBooking } from '@/models/booking';
import { sendBookingUpdateConfirmation, sendBookingCancellationNotification } from '@/lib/email-service';
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

interface BookingUpdateBody {
  date?: string;
  timeSlot?: string;
  schoolName?: string;
  contactName?: string;
  email?: string;
  phone?: string; // This will now include country code
  address?: string;
  city?: string;
  numberOfTalks?: number;
  includeWorkshop?: boolean;
  _id?: string;
  editToken?: string;
}

interface RouteParams {
  params: Promise<{
    token: string;
  }>
}

// Get a booking by its edit token
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { token } = await params;
  
  if (!token) {
    return NextResponse.json(
      { error: 'Token is required' },
      { status: 400 }
    );
  }

  try {
    await dbConnect();
    
    const booking = await Booking.findOne({ editToken: token });
    
    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ booking });
  } catch (error) {
    console.error('Error fetching booking:', error);
    return NextResponse.json(
      { error: 'Failed to fetch booking' },
      { status: 500 }
    );
  }
}

// Update a booking by its edit token
export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { token } = await params;
  
  if (!token) {
    return NextResponse.json(
      { error: 'Token is required' },
      { status: 400 }
    );
  }

  try {
    const body: BookingUpdateBody = await request.json();
    
    await dbConnect();
    
    // Find the booking by token
    const existingBooking = await Booking.findOne({ editToken: token });
    
    if (!existingBooking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }
    
    // Check if the date is changed
    if (body.date && new Date(body.date).toDateString() !== new Date(existingBooking.date).toDateString()) {
      // Standardize the new date format with UTC noon to avoid timezone issues
      const newDate = new Date(body.date);
      const standardizedNewDate = new Date(
        Date.UTC(
          newDate.getFullYear(),
          newDate.getMonth(),
          newDate.getDate(),
          12, 0, 0
        )
      );
      
      // If date is changed, check if the new date is already booked by ANOTHER booking
      // We need to exclude the current booking from this check
      const conflictingBooking = await Booking.findOne({
        _id: { $ne: existingBooking._id }, // Exclude current booking
        date: {
          $gte: new Date(standardizedNewDate.setHours(0, 0, 0, 0)),
          $lte: new Date(standardizedNewDate.setHours(23, 59, 59, 999))
        }
      });
      
      if (conflictingBooking) {
        return NextResponse.json(
          { error: 'The selected date is already booked by another school. Please choose a different date.' },
          { status: 409 }
        );
      }
      
      // Update the date with the standardized format
      body.date = standardizedNewDate.toISOString();
    }
    
    // Validate phone if it's being updated
    if (body.phone && body.phone.trim().length < 7) {
      return NextResponse.json(
        { error: 'Please provide a valid phone number' },
        { status: 400 }
      );
    }
    
    // Update the booking fields from the request body with proper type checking
    Object.keys(body).forEach(key => {
      if (key !== 'editToken' && key !== '_id') { // Don't allow updating the token or ID
        const typedKey = key as keyof IBooking;
        const value = body[key as keyof BookingUpdateBody];
        
        // Handle the date specially since it might be a string
        if (key === 'date' && value) {
          (existingBooking as unknown as Record<string, unknown>)[typedKey] = new Date(value as string);
        } else if (value !== undefined) {
          (existingBooking as unknown as Record<string, unknown>)[typedKey] = value;
        }
      }
    });
    
    await existingBooking.save();
    
    // Send updated confirmation email to user and notification to coach
    await sendBookingUpdateConfirmation(existingBooking);
    
    return NextResponse.json({
      success: true,
      booking: {
        ...existingBooking.toObject(),
        _id: (existingBooking._id as mongoose.Types.ObjectId).toString(),
        editToken: undefined, // Don't expose the token in the response
      }
    });
  } catch (error: unknown) {
    console.error('Error updating booking:', error);
    
    // Type guard for MongoDB duplicate key error
    const isMongoError = (err: unknown): err is { code: number; keyPattern?: Record<string, number> } => {
      return typeof err === 'object' && err !== null && 'code' in err;
    };
    
    // Check for duplicate key error (date already booked)
    if (isMongoError(error) && error.code === 11000 && error.keyPattern && error.keyPattern.date) {
      return NextResponse.json(
        { error: 'This date is already booked. Please choose a different date.' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update booking' },
      { status: 500 }
    );
  }
}

// Delete a booking by its edit token
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { token } = await params;
  
  if (!token) {
    return NextResponse.json(
      { error: 'Token is required' },
      { status: 400 }
    );
  }

  try {
    await dbConnect();
    
    const booking = await Booking.findOneAndDelete({ editToken: token });
    
    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }
    
    // Send cancellation notification to coach
    await sendBookingCancellationNotification(booking);
    
    return NextResponse.json({
      success: true,
      message: 'Booking successfully cancelled'
    });
  } catch (error: unknown) {
    console.error('Error deleting booking:', error);
    return NextResponse.json(
      { error: 'Failed to cancel booking' },
      { status: 500 }
    );
  }
}
