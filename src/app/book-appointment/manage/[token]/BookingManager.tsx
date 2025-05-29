'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import BookingCalendar from '@/components/booking/booking-calendar';
import TimeSlotSelector from '@/components/booking/time-slot-selector';
import BookingForm, { BookingFormData } from '@/components/booking/booking-form';

interface Booking {
  _id: string;
  date: string;
  timeSlot: string;
  schoolName: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  numberOfTalks: number;
  includeWorkshop?: boolean;
  editToken: string;
}

interface BookingManagerProps {
  token: string;
}

type ViewStep = 'view' | 'edit';

const BookingManager: React.FC<BookingManagerProps> = ({ token }) => {
  const router = useRouter();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<ViewStep>('view');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  
  // Edit state
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [editingTimeSlot, setEditingTimeSlot] = useState<string | null>(null);

  useEffect(() => {
    fetchBooking();
  }, [token]);

  const fetchBooking = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/bookings/${token}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          setError('Booking not found. The link may be expired or invalid.');
        } else {
          setError('Failed to load booking details.');
        }
        return;
      }
      
      const data = await response.json();
      setBooking(data.booking);
    } catch (error) {
      console.error('Error fetching booking:', error);
      setError('Failed to load booking details.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    if (booking) {
      setSelectedDate(new Date(booking.date));
      setEditingTimeSlot(booking.timeSlot);
      setCurrentStep('edit');
    }
  };

  const handleCancelBooking = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/bookings/${token}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to cancel booking');
      }

      router.push('/book-appointment/cancel-confirmation');
    } catch (error) {
      console.error('Error canceling booking:', error);
      setError('Failed to cancel booking');
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirmation(false);
    }
  };

  const handleFormSubmit = async (formData: BookingFormData) => {
    if (!selectedDate || !editingTimeSlot) {
      setError('Please select both date and time slot');
      return;
    }

    setIsUpdating(true);
    setError(null);

    try {
      const standardizedDate = new Date(
        Date.UTC(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          12, 0, 0
        )
      );

      const updateData = {
        ...formData,
        date: standardizedDate.toISOString(),
        timeSlot: editingTimeSlot,
      };

      const response = await fetch(`/api/bookings/${token}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update booking');
      }

      router.push('/book-appointment/edit-confirmation');
    } catch (error: unknown) {
      console.error('Update error:', error);
      setError(error instanceof Error ? error.message : 'Failed to update booking');
    } finally {
      setIsUpdating(false);
    }
  };

  const prepareInitialFormData = (booking: Booking): BookingFormData => {
    // Parse phone number to separate country code and number
    const parsePhone = (phoneString: string) => {
      const phoneMatch = phoneString.match(/^(\+\d{1,4})\s*(.+)$/);
      if (phoneMatch) {
        return {
          countryCode: phoneMatch[1],
          phone: phoneMatch[2].trim()
        };
      }
      return { countryCode: '+353', phone: phoneString };
    };

    const { countryCode, phone } = parsePhone(booking.phone || '');

    return {
      schoolName: booking.schoolName || '',
      contactName: booking.contactName || '',
      email: booking.email || '',
      countryCode,
      phone,
      address: booking.address || '',
      city: booking.city || '',
      numberOfTalks: booking.numberOfTalks || 1,
      includeWorkshop: booking.includeWorkshop || false
    };
  };

  // Delete confirmation modal
  const DeleteConfirmationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Cancel Booking</h3>
        <p className="text-gray-700 mb-4">
          Are you sure you want to cancel your booking for {booking && format(new Date(booking.date), 'EEEE, MMMM d, yyyy')} at {booking?.timeSlot}?
          {booking?.includeWorkshop && (
            <span className="block mt-2 text-blue-600 font-medium">
              This includes the workshop session.
            </span>
          )}
          This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => setShowDeleteConfirmation(false)}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleCancelBooking}
            className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              'Confirm Cancellation'
            )}
          </button>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    if (booking) {
      const initialData = prepareInitialFormData(booking);
      // Set your form data here with the parsed phone number
    }
  }, [booking]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
          <p className="text-gray-600 mb-6">{error || 'Booking not found'}</p>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            {currentStep === 'view' ? 'Manage Your Booking' : 'Edit Your Booking'}
          </h1>
          <p className="mt-2 text-gray-600">
            {currentStep === 'view' 
              ? 'View your booking details or make changes' 
              : 'Update your booking date, time, and details'
            }
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md">
            <p className="font-medium">Error</p>
            <p>{error}</p>
          </div>
        )}

        {/* View Mode */}
        {currentStep === 'view' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Booking Details</h2>
                <div className="text-sm text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full">
                  ✓ Confirmed
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Schedule</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Date:</span> {format(new Date(booking.date), 'EEEE, MMMM d, yyyy')}</p>
                    <p><span className="font-medium">Time:</span> {booking.timeSlot}</p>
                    <p><span className="font-medium">Number of Talks:</span> {booking.numberOfTalks}</p>
                    <p><span className="font-medium">Workshop Included:</span> {booking.includeWorkshop ? 'Yes' : 'No'}</p>
                    {booking.includeWorkshop && (
                      <p className="text-blue-600 font-medium">🎉 Workshop session included!</p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-3">School Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">School:</span> {booking.schoolName}</p>
                    <p><span className="font-medium">Contact:</span> {booking.contactName}</p>
                    <p><span className="font-medium">Email:</span> {booking.email}</p>
                    <p><span className="font-medium">Phone:</span> {booking.phone}</p>
                    <p><span className="font-medium">Address:</span> {booking.address}, {booking.city}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Edit Booking
                </button>
                <button
                  onClick={() => setShowDeleteConfirmation(true)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Mode */}
        {currentStep === 'edit' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Date Selection */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-lg mb-4">Select New Date</h3>
                <BookingCalendar
                  selectedDate={selectedDate}
                  onDateSelect={setSelectedDate}
                  excludeToken={token}
                />
                {selectedDate && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-md">
                    <p className="text-sm text-blue-800">
                      <strong>Selected:</strong> {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                    </p>
                  </div>
                )}
              </div>

              {/* Time Selection */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-lg mb-4">Select New Time</h3>
                {selectedDate ? (
                  <>
                    <TimeSlotSelector
                      date={selectedDate}
                      selectedTimeSlot={editingTimeSlot}
                      onSelectTimeSlot={setEditingTimeSlot}
                    />
                    {editingTimeSlot && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-md">
                        <p className="text-sm text-blue-800">
                          <strong>Selected:</strong> {editingTimeSlot}
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex items-center justify-center h-32 bg-gray-50 rounded-md">
                    <p className="text-gray-500">Please select a date first</p>
                  </div>
                )}
              </div>
            </div>

            {/* Form */}
            {selectedDate && editingTimeSlot && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-lg mb-4">Update Booking Details</h3>
                <BookingForm
                  selectedDate={selectedDate}
                  initialData={prepareInitialFormData(booking)}
                  onSubmit={handleFormSubmit}
                  onCancel={() => setCurrentStep('view')}
                />
              </div>
            )}

            {/* Action buttons when not all selections are made */}
            {(!selectedDate || !editingTimeSlot) && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between">
                  <button
                    onClick={() => setCurrentStep('view')}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    className={`px-4 py-2 text-white rounded-md ${
                      selectedDate && editingTimeSlot
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                    disabled={!selectedDate || !editingTimeSlot}
                  >
                    Continue to Details
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {showDeleteConfirmation && <DeleteConfirmationModal />}
    </div>
  );
};

export default BookingManager;