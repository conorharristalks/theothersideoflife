'use client';

import { addMonths, eachDayOfInterval, endOfMonth, format, isSameDay, isSameMonth, isBefore, startOfDay, startOfMonth, startOfWeek, endOfWeek, subMonths } from 'date-fns';
import { useState } from 'react';


interface BookingInfo {
  date: string;
  schoolName: string;
  contactName: string;
  isBlocked: boolean;
  blockReason?: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [allBookings, setAllBookings] = useState<BookingInfo[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isBlocked, setIsBlocked] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(null);
  const [showPastBookings, setShowPastBookings] = useState(false);

  const today = startOfDay(new Date());

  const authenticate = async () => {
    try {
      const response = await fetch('/api/admin/blocked-dates', {
        headers: {
          'Authorization': `Bearer ${password}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        setIsAuthenticated(true);
        setMessage('');
        setIsBlocked(false);
        setRemainingAttempts(null);
        
        await fetchAllBookings();
      } else {
        if (response.status === 429) {
          setIsBlocked(true);
          setMessage(data.error);
        } else {
          setIsBlocked(false);
          setMessage(data.error || 'Authentication failed');
          if (data.remainingAttempts !== undefined) {
            setRemainingAttempts(data.remainingAttempts);
          }
        }
      }
    } catch {
      setMessage('Authentication failed');
    }
  };



  const fetchAllBookings = async () => {
    try {
      const response = await fetch('/api/admin/bookings', {
        headers: {
          'Authorization': `Bearer ${password}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAllBookings(data.bookings);
      }
    } catch {
      console.error('Error fetching all bookings');
    }
  };

  const blockDate = async () => {
    if (!selectedDate) return;

    setIsLoading(true);
    try {
      const utcDate = new Date(Date.UTC(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        12, 0, 0
      ));
      
      const response = await fetch('/api/admin/blocked-dates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${password}`
        },
        body: JSON.stringify({
          date: utcDate.toISOString()
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage('Date blocked successfully');
        setSelectedDate(null);
        
        await fetchAllBookings();
      } else {
        setMessage(data.error || 'Failed to block date');
      }
    } catch {
      setMessage('Error blocking date');
    } finally {
      setIsLoading(false);
    }
  };

  const unblockDate = async (date: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/blocked-dates?date=${date}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${password}`
        }
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage('Date unblocked successfully');
        
        await fetchAllBookings();
      } else {
        setMessage(data.error || 'Failed to unblock date');
      }
    } catch {
      setMessage('Error unblocking date');
    } finally {
      setIsLoading(false);
    }
  };

  const getDateStatus = (date: Date) => {
    const booking = allBookings.find(booking => 
      isSameDay(new Date(booking.date), date)
    );
    
    if (booking) {
      return {
        isBooked: true,
        isBlocked: booking.isBlocked,
        schoolName: booking.schoolName,
        contactName: booking.contactName
      };
    }
    
    return {
      isBooked: false,
      isBlocked: false,
      schoolName: null,
      contactName: null
    };
  };

  // Build full calendar grid for the month (Mon–Sun rows)
  const getCalendarDays = (month: Date) => {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);
    const calStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const calEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
    return eachDayOfInterval({ start: calStart, end: calEnd });
  };

  const filteredBookings = showPastBookings
    ? allBookings
    : allBookings.filter(b => !isBefore(startOfDay(new Date(b.date)), today));

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6">Admin Access</h1>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              onKeyPress={(e) => e.key === 'Enter' && !isBlocked && authenticate()}
              disabled={isBlocked}
            />
            <button
              onClick={authenticate}
              disabled={isBlocked}
              className={`w-full py-2 rounded-md ${
                isBlocked 
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isBlocked ? 'Blocked' : 'Login'}
            </button>
          </div>
          {message && (
            <div className="mt-4 text-center text-red-600">
              <p>{message}</p>
              {remainingAttempts !== null && remainingAttempts > 0 && !isBlocked && (
                <p className="text-sm text-yellow-600 mt-2">
                  {remainingAttempts} attempt{remainingAttempts !== 1 ? 's' : ''} remaining
                </p>
              )}
            </div>
          )}
          {!isBlocked && (
            <div className="mt-4 text-xs text-gray-500 text-center">
              <p>Rate limiting: 5 attempts per 15 minutes</p>
              <p>Temporary block: 30 minutes after 5 failed attempts</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Admin Panel - Manage Dates</h1>
        
        {message && (
          <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 text-blue-700">
            {message}
          </div>
        )}

        {/* Legend */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold mb-3">Calendar Legend</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-100 border border-green-300 rounded mr-2"></div>
              <span className="text-sm">Available</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded mr-2"></div>
              <span className="text-sm">Booked by School</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-100 border border-red-300 rounded mr-2"></div>
              <span className="text-sm">Blocked (Admin)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded mr-2"></div>
              <span className="text-sm">Past Date / Other Month</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* Month navigation with clear month/year label */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 font-medium"
            >
              ← Prev
            </button>
            <h2 className="text-2xl font-bold text-gray-800">
              {format(currentMonth, 'MMMM yyyy')}
            </h2>
            <button
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 font-medium"
            >
              Next →
            </button>
          </div>

          {/* Jump to today */}
          <div className="flex justify-center mb-4">
            <button
              onClick={() => setCurrentMonth(new Date())}
              className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
            >
              Today ({format(new Date(), 'dd MMM yyyy')})
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <div key={day} className="text-center font-medium text-gray-600 py-2 text-sm">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1 mb-6">
            {getCalendarDays(currentMonth).map(date => {
              const dateStatus = getDateStatus(date);
              const isSelected = selectedDate && isSameDay(date, selectedDate);
              const isPast = isBefore(date, today);
              const isCurrentMonth = isSameMonth(date, currentMonth);

              let bgColor = 'bg-green-50 border-green-200';
              let textColor = 'text-gray-900';
              let label = '';

              if (!isCurrentMonth || isPast) {
                bgColor = 'bg-gray-100 border-gray-200';
                textColor = 'text-gray-400';
              } else if (dateStatus.isBooked) {
                if (dateStatus.isBlocked) {
                  bgColor = 'bg-red-100 border-red-300';
                  textColor = 'text-red-700';
                  label = 'BLOCKED';
                } else {
                  bgColor = 'bg-blue-100 border-blue-300';
                  textColor = 'text-blue-700';
                  label = 'BOOKED';
                }
              }

              if (isSelected) {
                bgColor = 'bg-yellow-100 border-yellow-500';
                textColor = 'text-gray-900';
              }

              const isDisabled = isPast || !isCurrentMonth || dateStatus.isBooked;

              return (
                <button
                  key={date.toISOString()}
                  onClick={() => !isDisabled && setSelectedDate(date)}
                  disabled={isDisabled}
                  className={`
                    p-2 text-sm border rounded min-h-[70px] flex flex-col justify-between
                    ${bgColor} ${textColor}
                    ${isDisabled ? 'cursor-not-allowed' : 'hover:bg-yellow-50 cursor-pointer'}
                  `}
                  title={
                    !isCurrentMonth ? 'Different month' :
                    dateStatus.isBooked
                      ? `${dateStatus.isBlocked ? 'Blocked by admin' : `Booked by ${dateStatus.schoolName}`}`
                      : isPast ? 'Past date' : 'Click to select'
                  }
                >
                  <div className="font-semibold text-base leading-none">
                    {format(date, 'd')}
                  </div>
                  {isCurrentMonth && label && (
                    <div className="text-xs font-bold mt-1">{label}</div>
                  )}
                  {isCurrentMonth && dateStatus.isBooked && !dateStatus.isBlocked && (
                    <div className="text-xs truncate">{dateStatus.schoolName}</div>
                  )}
                </button>
              );
            })}
          </div>

          {selectedDate && (
            <div className="p-4 bg-yellow-50 border border-yellow-300 rounded mb-4">
              <h3 className="font-medium mb-2">
                Selected: <span className="text-yellow-800 font-bold">{format(selectedDate, 'EEEE, MMMM d, yyyy')}</span>
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={blockDate}
                  disabled={isLoading}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
                >
                  {isLoading ? 'Blocking...' : 'Block This Date'}
                </button>
                <button
                  onClick={() => setSelectedDate(null)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Bookings list */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">All Bookings & Blocked Dates</h3>
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showPastBookings}
                  onChange={(e) => setShowPastBookings(e.target.checked)}
                  className="rounded"
                />
                Show past dates
              </label>
            </div>

            {filteredBookings.length === 0 ? (
              <p className="text-gray-500">
                {showPastBookings ? 'No bookings or blocked dates' : 'No upcoming bookings or blocked dates'}
              </p>
            ) : (
              <div className="space-y-2">
                {filteredBookings.map((booking, index) => (
                  <div
                    key={`${booking.date}-${index}`}
                    className={`flex justify-between items-center p-3 rounded ${booking.isBlocked ? 'bg-red-50' : 'bg-blue-50'}`}
                  >
                    <div className="flex-1">
                      <div className="font-medium">
                        {format(new Date(booking.date), 'EEEE, MMMM d, yyyy')}
                      </div>
                      {booking.isBlocked ? (
                        <div className="text-sm text-red-600">
                          <span className="font-medium">BLOCKED</span>
                          {booking.blockReason && ` - ${booking.blockReason}`}
                        </div>
                      ) : (
                        <div className="text-sm text-blue-600">
                          <span className="font-medium">{booking.schoolName}</span>
                          <span className="text-gray-600"> - Contact: {booking.contactName}</span>
                        </div>
                      )}
                    </div>
                    {booking.isBlocked && (
                      <button
                        onClick={() => unblockDate(booking.date)}
                        disabled={isLoading}
                        className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 disabled:opacity-50"
                      >
                        Unblock
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
