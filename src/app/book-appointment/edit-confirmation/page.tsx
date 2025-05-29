'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function EditConfirmationPage() {
  // Clear any cached booking data on successful edit
  useEffect(() => {
    // Add a simple cache buster by making a request to the availability endpoint
    const clearCache = async () => {
      try {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const timestamp = now.getTime();
        
        // Force a fresh fetch that will update any cached data
        await fetch(`/api/bookings/available-dates?year=${year}&month=${month}&_=${timestamp}`);
      } catch (error) {
        console.error('Error refreshing availability data:', error);
      }
    };
    
    clearCache();
  }, []);

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
            Booking Updated!
          </h1>
          
          <p className="text-lg text-gray-600 mb-6">
            Your booking has been successfully updated. An updated confirmation email has been sent to your email address.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/" 
              className="px-6 py-3 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
