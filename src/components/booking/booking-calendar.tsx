'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { isSameDay, isPast, endOfDay } from 'date-fns';

interface BookingCalendarProps {
  onDateSelect: (date: Date) => void;
  selectedDate: Date | null;
  excludeToken?: string; // Add this prop
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ onDateSelect, selectedDate, excludeToken }) => {
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  
  // State for the month currently displayed by the calendar
  const [displayedMonth, setDisplayedMonth] = useState<Date>(() => {
    const initialDate = selectedDate || new Date();
    return new Date(initialDate.getFullYear(), initialDate.getMonth(), 1);
  });

  // Get current date with time set to start of day for comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Fetch booked dates when displayedMonth changes
  useEffect(() => {
    fetchBookedDatesForMonth(displayedMonth);
  }, [displayedMonth, excludeToken]);

  // Fetch booked dates for a given month
  const fetchBookedDatesForMonth = async (month: Date) => {
    setIsLoading(true);
    setFetchError(null);
    
    try {
      const year = month.getFullYear();
      const monthIndex = month.getMonth() + 1;
      
      // Add a cache-busting parameter to force a fresh fetch
      const cacheBuster = new Date().getTime();
      let url = `/api/bookings/available-dates?year=${year}&month=${monthIndex}&_=${cacheBuster}`;
      
      // Include excludeToken if we're editing a booking
      if (excludeToken) {
        url += `&excludeToken=${excludeToken}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (Array.isArray(data.bookedDates)) {
        // Parse dates more carefully to handle timezone issues
        const parsedDates = data.bookedDates.map((dateStr: string) => {
          // Parse the YYYY-MM-DD format more carefully
          const [year, month, day] = dateStr.split('-').map(Number);
          
          // Create date in local timezone but be more explicit about it
          const localDate = new Date(year, month - 1, day, 12, 0, 0); // Set to noon to avoid DST issues
          
          return localDate;
        });
        
        setBookedDates(parsedDates);
      } else {
        console.warn('Unexpected data format:', data);
        setBookedDates([]);
      }
    } catch (error) {
      console.error('Error fetching booked dates:', error);
      setFetchError(error instanceof Error ? error.message : 'Failed to fetch booked dates');
      setBookedDates([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Add a function to force refresh the calendar data
  const refreshCalendarData = () => {
    fetchBookedDatesForMonth(displayedMonth);
  };

  // Expose refresh function globally for debugging
  React.useEffect(() => {
    const globalWindow = window as { refreshCalendar?: () => void };
    globalWindow.refreshCalendar = refreshCalendarData;
    return () => {
      delete globalWindow.refreshCalendar;
    };
  }, [displayedMonth]);

  // Function to disable past dates and already booked dates
  const disabledDays = (date: Date): boolean => {
    const isPastDate = isPast(endOfDay(date)) && !isSameDay(date, today);
    
    const isBookedDate = bookedDates.some((bookedDate) => {
      // Use more precise date comparison
      return bookedDate.getFullYear() === date.getFullYear() &&
             bookedDate.getMonth() === date.getMonth() &&
             bookedDate.getDate() === date.getDate();
    });
    
    return isPastDate || isBookedDate;
  };

  // Handle month change from the Calendar component
  const handleMonthChange = (month: Date) => {
    // The month parameter from DayPicker is already the first day of the new month.
    setDisplayedMonth(new Date(month.getFullYear(), month.getMonth(), 1));
  };

  return (
    <div className="booking-calendar flex flex-col items-center w-full cursor-default">
      <h2 className="text-2xl w-full text-center font-fraunces font-bold text-accent-1 mb-8">Select a Date</h2>
      {fetchError && (
        <div className="w-full max-w-[500px] mb-4 p-3 bg-red-900/20 border border-red-900/50 text-red-400 rounded-md text-sm">
          <p>Error loading availability data. Using local filtering only.</p>
        </div>
      )}
      
      {isLoading ? (
        <div className="flex justify-center items-center p-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-1"></div>
        </div>
      ) : (
        <div className="flex justify-center w-full">
          <Calendar
            mode="single"
            selected={selectedDate ?? undefined}
            onSelect={(date) => date && onDateSelect(date)}
            disabled={disabledDays}
            month={displayedMonth} // Control the displayed month
            onMonthChange={handleMonthChange} // Update displayedMonth and trigger fetch
            className="w-full max-w-[500px]"
            showOutsideDays={false} // Hide dates from other months
            fixedWeeks={false} // Allow natural week adjustment
            weekStartsOn={0} // Start week on Sunday for cleaner layout
            // Custom styling for booked dates
            modifiers={{
              booked: (date: Date) => bookedDates.some((bookedDate) => {
                return bookedDate.getFullYear() === date.getFullYear() &&
                       bookedDate.getMonth() === date.getMonth() &&
                       bookedDate.getDate() === date.getDate();
              }),
            }}
            modifiersStyles={{
              booked: { 
                textDecoration: 'line-through',
                color: 'rgba(245, 245, 245, 0.3)',
                pointerEvents: 'none'
              }
            }}
            // Add custom styles to ensure proper layout
            style={{
              '--rdp-cell-size': '44px',
            } as React.CSSProperties}
          />
        </div>
      )}
      
      <div className="mt-10 text-sm flex gap-8 justify-center w-full">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-secondary/50 rounded-md border border-white/10"></div>
          <span className='text-foreground/80 font-medium'>Already Booked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-accent-1 rounded-md"></div>
          <span className='text-foreground/80 font-medium'>Selected Date</span>
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;