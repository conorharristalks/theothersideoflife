'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const [emailSent, setEmailSent] = useState<boolean>(true);
  
  // Check if the email was successfully sent (passed as a URL parameter)
  useEffect(() => {
    const emailStatus = searchParams.get('emailSent');
    if (emailStatus === 'false') {
      setEmailSent(false);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
            Booking Confirmed!
          </h1>
          
          <p className="text-lg text-gray-600 mb-6">
            Thank you for booking a wellbeing session. We look forward to visiting your school.
          </p>
          
          {emailSent ? (
            <p className="mb-6 text-gray-600">
              A confirmation email has been sent to your email address with all the details of your booking.
              The email includes a link to manage or cancel your booking if needed.
            </p>
          ) : (
            <div className="p-4 mb-6 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800">
              <p className="font-medium">Note:</p>
              <p>There was an issue sending the confirmation email. Please contact us if you need to make changes to your booking.</p>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/" 
              className="px-6 py-3 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors">
              Return to Home
            </Link>
            <Link href="/book-appointment" 
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Make Another Booking
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
