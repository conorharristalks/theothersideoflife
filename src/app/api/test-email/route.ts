import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email') || process.env.EMAIL_USER || 'test@example.com';
    
    // Use the same configuration as in your email-service.ts
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST as string,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER as string,
        pass: process.env.EMAIL_PASSWORD as string,
      },
    });
    
    // Send a simple test email
    try {
      const info = await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Test Email from Booking System',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #4a5568;">Email Test</h1>
            <p>This is a test email from your booking system.</p>
            <p>If you're seeing this, your email configuration is working correctly!</p>
            <p>Current time: ${new Date().toISOString()}</p>
          </div>
        `,
      });
      
      console.log('Test email sent:', info.messageId);
      
      return NextResponse.json({
        success: true,
        messageId: info.messageId,
        message: 'Test email sent successfully!'
      });
    } catch (emailError) {
      console.error('Error sending test email:', emailError);
      return NextResponse.json({
        success: false,
        error: emailError instanceof Error ? emailError.message : 'Unknown email error'
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in test email API:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
