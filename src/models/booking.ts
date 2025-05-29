import mongoose, { Document, Model } from 'mongoose';
import { VALIDATION, DEFAULTS } from '@/lib/constants';

// Define interfaces for type safety
export interface IBooking extends Document {
  date: Date;
  timeSlot: string;
  schoolName: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  numberOfTalks: number;
  includeWorkshop: boolean;
  editToken: string;
  createdAt: Date;
  isBlocked?: boolean;
  blockReason?: string;
}

// Interface for the Model with custom static methods
export interface IBookingModel extends Model<IBooking> {
  isDateBooked(date: Date): Promise<boolean>;
  generateEditToken(): string;
  createBlockedDate(date: Date, reason?: string): Promise<IBooking>;
}

const BookingSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, 'Please provide a booking date']
  },
  timeSlot: {
    type: String,
    required: [true, 'Please select a time slot'],
    enum: [
      '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', 
      '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', 
      '4:00 PM', '4:30 PM', 'BLOCKED'
    ]
  },
  schoolName: {
    type: String,
    required: [true, 'Please provide the school name'],
    trim: true,
    maxlength: [100, 'School name cannot be more than 100 characters']
  },
  contactName: {
    type: String,
    required: [true, 'Please provide a contact person name'],
    trim: true,
    maxlength: [50, 'Contact name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: false,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: false,
    trim: true
  },
  address: {
    type: String,
    required: false,
    trim: true
  },
  city: {
    type: String,
    required: false,
    trim: true
  },
  numberOfTalks: {
    type: Number,
    required: [true, 'Please provide the number of talks'],
    min: 0,
    max: VALIDATION.MAX_TALKS
  },
  includeWorkshop: {
    type: Boolean,
    default: false,
    required: true
  },
  editToken: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  blockReason: {
    type: String,
    default: ''
  }
});

// Pre-save validation hook
BookingSchema.pre('save', function(next) {
  // Skip validation for admin blocked dates
  if (this.schoolName === 'ADMIN_BLOCKED') {
    return next();
  }
  
  // For regular bookings, validate required fields
  if (!this.email) {
    return next(new Error('Please provide an email address'));
  }
  
  if (!this.phone) {
    return next(new Error('Please provide a phone number'));
  }
  
  if (!this.address) {
    return next(new Error('Please provide an address'));
  }
  
  if (!this.city) {
    return next(new Error('Please provide a city'));
  }
  
  if (this.numberOfTalks < VALIDATION.MIN_TALKS) {
    return next(new Error(`Number of talks must be at least ${VALIDATION.MIN_TALKS}`));
  }
  
  // Validate email format
  if (!VALIDATION.EMAIL_REGEX.test(this.email)) {
    return next(new Error('Please provide a valid email address'));
  }
  
  // Simple phone validation - just check it exists and has reasonable format
  if (this.phone && this.schoolName !== 'ADMIN_BLOCKED') {
    if (!VALIDATION.PHONE_REGEX.test(this.phone)) {
      return next(new Error('Please provide a valid phone number'));
    }
  }
  
  next();
});

// Create indexes for better query performance
BookingSchema.index({ date: 1 }, { unique: true });
BookingSchema.index({ date: 1, _id: 1 });

// Helper method to check if a date is booked (including blocked dates)
BookingSchema.statics.isDateBooked = async function(date: Date): Promise<boolean> {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();
  
  const startOfDay = new Date(Date.UTC(year, month, day, 0, 0, 0));
  const endOfDay = new Date(Date.UTC(year, month, day, 23, 59, 59, 999));
  
  const existingBooking = await this.findOne({
    date: {
      $gte: startOfDay,
      $lte: endOfDay
    }
  });
  
  return !!existingBooking;
};

// Generate a secure random token for editing/canceling bookings
BookingSchema.statics.generateEditToken = function(): string {
  return require('crypto').randomBytes(32).toString('hex');
};

// Helper method to create a blocked date
BookingSchema.statics.createBlockedDate = async function(date: Date, reason: string = DEFAULTS.ADMIN_BLOCKED_REASON): Promise<IBooking> {
  const standardizedDate = new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      12, 0, 0
    )
  );

  const editToken = require('crypto').randomBytes(32).toString('hex');

  const blockedBooking = new this({
    date: standardizedDate,
    timeSlot: 'BLOCKED',
    schoolName: 'ADMIN_BLOCKED',
    contactName: 'System Admin',
    email: 'admin@blocked.system',
    phone: 'N/A',
    address: 'N/A',
    city: 'N/A',
    numberOfTalks: 0,
    editToken,
    isBlocked: true,
    blockReason: reason
  });

  return await blockedBooking.save();
};

const Booking = (mongoose.models.Booking || mongoose.model<IBooking, IBookingModel>('Booking', BookingSchema)) as IBookingModel;

export default Booking;