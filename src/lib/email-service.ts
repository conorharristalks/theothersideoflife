import { IBooking } from '@/models/booking';
import nodemailer from 'nodemailer';

interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

// Configure the email transporter
// For production, replace with your actual email service settings
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST as string,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER as string,
    pass: process.env.EMAIL_PASSWORD as string,
  },
});

// Format date for email display
const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

// Send booking confirmation email to user
export const sendBookingConfirmation = async (booking: IBooking): Promise<EmailResult> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const editUrl = `${baseUrl}/book-appointment/manage/${booking.editToken}`;
  
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: booking.email,
    subject: 'Your Wellbeing Talk Booking Confirmation',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #4a5568;">Booking Confirmation</h1>
        <p>Dear ${booking.contactName},</p>
        <p>Thank you for booking wellbeing talks for <strong>${booking.schoolName}</strong>.</p>
        
        <div style="background-color: #f7fafc; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h2 style="color: #2d3748; margin-top: 0;">Booking Details</h2>
          <p><strong>Date:</strong> ${formatDate(booking.date)}</p>
          <p><strong>Time:</strong> ${booking.timeSlot}</p>
          <p><strong>School:</strong> ${booking.schoolName}</p>
          <p><strong>Contact Person:</strong> ${booking.contactName}</p>
          <p><strong>Email:</strong> ${booking.email}</p>
          <p><strong>Phone:</strong> ${booking.phone}</p>
          <p><strong>Address:</strong> ${booking.address}, ${booking.city}</p>
          <p><strong>Number of Talks:</strong> ${booking.numberOfTalks}</p>
          <p><strong>Workshop Included:</strong> ${booking.includeWorkshop ? 'Yes' : 'No'}</p>
          ${booking.includeWorkshop ? '<p style="color: #2563eb; font-weight: 500;">🎉 Workshop session has been added to your booking!</p>' : ''}
        </div>
        
        <p>You can manage your booking using the link below:</p>
        <p style="text-align: center;">
          <a href="${editUrl}" style="background-color: #4299e1; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Manage Your Booking
          </a>
        </p>
        
        <p>If you have any questions, please don't hesitate to contact us.</p>
        <p>Kind regards,<br>Wellbeing Coach Team</p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    
    // Also send notification to coach
    await sendCoachNotification(booking, 'new');
    
    return { success: true, messageId: info.messageId };
  } catch (error: unknown) {
    console.error('Error sending email: ', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown email error';
    return { success: false, error: errorMessage };
  }
};

// Send notification email to coach
export const sendCoachNotification = async (booking: IBooking, type: 'new' | 'updated' | 'cancelled'): Promise<EmailResult> => {
  const coachEmail = process.env.COACH_EMAIL || process.env.EMAIL_USER;
  
  if (!coachEmail) {
    console.warn('Coach email not configured');
    return { success: false, error: 'Coach email not configured' };
  }

  const getSubjectAndTitle = () => {
    switch (type) {
      case 'new':
        return { subject: 'New Booking Received', title: 'New Booking Alert' };
      case 'updated':
        return { subject: 'Booking Updated', title: 'Booking Update Alert' };
      case 'cancelled':
        return { subject: 'Booking Cancelled', title: 'Booking Cancellation Alert' };
      default:
        return { subject: 'Booking Notification', title: 'Booking Alert' };
    }
  };

  const { subject, title } = getSubjectAndTitle();

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: coachEmail,
    subject: `${subject} - ${booking.schoolName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #4a5568;">${title}</h1>
        
        ${type === 'new' ? '<p>A new booking has been received:</p>' : ''}
        ${type === 'updated' ? '<p>A booking has been updated:</p>' : ''}
        ${type === 'cancelled' ? '<p>A booking has been cancelled:</p>' : ''}
        
        <div style="background-color: #f7fafc; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h2 style="color: #2d3748; margin-top: 0;">Booking Details</h2>
          <p><strong>Date:</strong> ${formatDate(booking.date)}</p>
          <p><strong>Time:</strong> ${booking.timeSlot}</p>
          <p><strong>School:</strong> ${booking.schoolName}</p>
          <p><strong>Contact Person:</strong> ${booking.contactName}</p>
          <p><strong>Email:</strong> ${booking.email}</p>
          <p><strong>Phone:</strong> ${booking.phone}</p>
          <p><strong>Address:</strong> ${booking.address}, ${booking.city}</p>
          <p><strong>Number of Talks:</strong> ${booking.numberOfTalks}</p>
          <p><strong>Workshop Included:</strong> ${booking.includeWorkshop ? 'Yes' : 'No'}</p>
          ${booking.includeWorkshop ? '<p style="color: #2563eb; font-weight: 500;">🎉 Workshop session included!</p>' : ''}
          
          ${type === 'cancelled' ? '<p style="color: #dc2626; font-weight: 500; margin-top: 15px;">⚠️ This booking has been cancelled and the date is now available.</p>' : ''}
        </div>
        
        ${type === 'new' ? '<p>Please make sure to update your calendar and prepare for the session.</p>' : ''}
        ${type === 'updated' ? '<p>Please review the updated details and update your calendar accordingly.</p>' : ''}
        ${type === 'cancelled' ? '<p>The date is now available for new bookings.</p>' : ''}
        
        <p>Best regards,<br>Booking System</p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error: unknown) {
    console.error('Error sending coach notification email: ', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown email error';
    return { success: false, error: errorMessage };
  }
};

// Send booking update confirmation
export const sendBookingUpdateConfirmation = async (booking: IBooking): Promise<EmailResult> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const editUrl = `${baseUrl}/book-appointment/manage/${booking.editToken}`;
  
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: booking.email,
    subject: 'Your Wellbeing Talk Booking Updated',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #4a5568;">Booking Updated</h1>
        <p>Dear ${booking.contactName},</p>
        <p>Your booking for <strong>${booking.schoolName}</strong> has been successfully updated.</p>
        
        <div style="background-color: #f7fafc; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h2 style="color: #2d3748; margin-top: 0;">Updated Booking Details</h2>
          <p><strong>Date:</strong> ${formatDate(booking.date)}</p>
          <p><strong>Time:</strong> ${booking.timeSlot}</p>
          <p><strong>School:</strong> ${booking.schoolName}</p>
          <p><strong>Contact Person:</strong> ${booking.contactName}</p>
          <p><strong>Email:</strong> ${booking.email}</p>
          <p><strong>Phone:</strong> ${booking.phone}</p>
          <p><strong>Address:</strong> ${booking.address}, ${booking.city}</p>
          <p><strong>Number of Talks:</strong> ${booking.numberOfTalks}</p>
          <p><strong>Workshop Included:</strong> ${booking.includeWorkshop ? 'Yes' : 'No'}</p>
          ${booking.includeWorkshop ? '<p style="color: #2563eb; font-weight: 500;">🎉 Workshop session included!</p>' : ''}
        </div>
        
        <p>You can continue to manage your booking using the link below:</p>
        <p style="text-align: center;">
          <a href="${editUrl}" style="background-color: #4299e1; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Manage Your Booking
          </a>
        </p>
        
        <p>If you have any questions, please don't hesitate to contact us.</p>
        <p>Kind regards,<br>Wellbeing Coach Team</p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    
    // Also send update notification to coach
    await sendCoachNotification(booking, 'updated');
    
    return { success: true, messageId: info.messageId };
  } catch (error: unknown) {
    console.error('Error sending booking update email: ', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown email error';
    return { success: false, error: errorMessage };
  }
};

// Send booking cancellation notification to coach
export const sendBookingCancellationNotification = async (booking: IBooking): Promise<EmailResult> => {
  return await sendCoachNotification(booking, 'cancelled');
};