'use client';

import { addDays, eachDayOfInterval, endOfWeek, format, isSameDay, startOfWeek } from 'date-fns';
import { useState } from 'react';

interface BlockedDate {
  date: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const authenticate = async () => {
    try {
      const response = await fetch('/api/admin/blocked-dates', {
        headers: {
          'Authorization': `Bearer ${password}`
        }
      });

      if (response.ok) {
        setIsAuthenticated(true);
        await fetchBlockedDates();
      } else {
        setMessage('Invalid password');
      }
    } catch {
      setMessage('Authentication failed');
    }
  };

  const fetchBlockedDates = async () => {
    try {
      const response = await fetch('/api/admin/blocked-dates', {
        headers: {
          'Authorization': `Bearer ${password}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setBlockedDates(data.blockedDates);
      }
    } catch {
      console.error('Error fetching blocked dates');
    }
  };

  const blockDate = async () => {
    if (!selectedDate) return;

    setIsLoading(true);
    try {
      // Fix: Make sure we're sending the date in a timezone-safe format
      // Add time component and ensure we're using UTC
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
        await fetchBlockedDates();
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
        await fetchBlockedDates();
      } else {
        setMessage(data.error || 'Failed to unblock date');
      }
    } catch {
      setMessage('Error unblocking date');
    } finally {
      setIsLoading(false);
    }
  };

  const isDateBlocked = (date: Date) => {
    return blockedDates.some(blocked => 
      isSameDay(new Date(blocked.date), date)
    );
  };

  const getWeekDays = (weekStart: Date) => {
    const start = startOfWeek(weekStart, { weekStartsOn: 1 }); // Monday
    const end = endOfWeek(weekStart, { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  };

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
              onKeyPress={(e) => e.key === 'Enter' && authenticate()}
            />
            <button
              onClick={authenticate}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Login
            </button>
          </div>
          {message && (
            <p className="mt-4 text-center text-red-600">{message}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Block Dates</h1>
        
        {message && (
          <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 text-blue-700">
            {message}
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Calendar</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentWeek(addDays(currentWeek, -7))}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                ← Previous Week
              </button>
              <button
                onClick={() => setCurrentWeek(addDays(currentWeek, 7))}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                Next Week →
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <div key={day} className="text-center font-medium text-gray-600 py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 mb-6">
            {getWeekDays(currentWeek).map(date => {
              const isBlocked = isDateBlocked(date);
              const isSelected = selectedDate && isSameDay(date, selectedDate);
              const isPast = date < new Date();

              return (
                <button
                  key={date.toISOString()}
                  onClick={() => !isPast && setSelectedDate(date)}
                  disabled={isPast}
                  className={`
                    p-3 text-sm border rounded
                    ${isSelected ? 'bg-blue-100 border-blue-500' : ''}
                    ${isBlocked ? 'bg-red-100 border-red-300 text-red-700' : ''}
                    ${isPast ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-50'}
                    ${!isBlocked && !isPast && !isSelected ? 'border-gray-200' : ''}
                  `}
                >
                  {format(date, 'd')}
                  {isBlocked && <div className="text-xs mt-1">BLOCKED</div>}
                </button>
              );
            })}
          </div>

          {selectedDate && (
            <div className="p-4 bg-gray-50 rounded mb-4">
              <h3 className="font-medium mb-2">
                Selected: {format(selectedDate, 'EEEE, MMMM d, yyyy')}
              </h3>
              <button
                onClick={blockDate}
                disabled={isLoading}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
              >
                {isLoading ? 'Blocking...' : 'Block This Date'}
              </button>
            </div>
          )}

          {/* Blocked Dates List */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-4">Currently Blocked Dates</h3>
            
            {blockedDates.length === 0 ? (
              <p className="text-gray-500">No dates blocked</p>
            ) : (
              <div className="space-y-2">
                {blockedDates.map(blocked => (
                  <div key={blocked.date} className="flex justify-between items-center p-3 bg-red-50 rounded">
                    <div className="font-medium">
                      {format(new Date(blocked.date), 'EEEE, MMMM d, yyyy')}
                    </div>
                    <button
                      onClick={() => unblockDate(blocked.date)}
                      disabled={isLoading}
                      className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 disabled:opacity-50"
                    >
                      Unblock
                    </button>
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
