'use client';

import { useState } from 'react';

interface TimeSlotSelectorProps {
  onSelectTimeSlot: (timeSlot: string) => void;
  selectedTimeSlot: string | null;
  date: Date;
}

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  onSelectTimeSlot,
  selectedTimeSlot,
  date,
}) => {
  // Define morning and afternoon time slots
  const morningSlots = ['8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'];
  const afternoonSlots = ['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'];
  
  // Format date for display
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
  
  return (
    <div className="time-slot-selector p-4 border rounded-lg shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-4">Select Time for {formattedDate}</h2>
      
      <div className="mb-6">
        <h3 className="font-medium text-gray-700 mb-2">Morning</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {morningSlots.map((time) => (
            <button
              key={time}
              type="button"
              className={`p-2 text-sm border rounded-md transition-colors cursor-pointer ${
                selectedTimeSlot === time
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => onSelectTimeSlot(time)}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="font-medium text-gray-700 mb-2">Afternoon</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {afternoonSlots.map((time) => (
            <button
              key={time}
              type="button"
              className={`p-2 text-sm border rounded-md transition-colors cursor-pointer ${
                selectedTimeSlot === time
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => onSelectTimeSlot(time)}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
      
      {selectedTimeSlot && (
        <div className="mt-4 p-3 bg-blue-50 text-blue-800 rounded-md">
          <p className="font-medium">Selected Time: {selectedTimeSlot}</p>
          <p className="text-sm">Click "Continue" below to complete your booking details</p>
        </div>
      )}
    </div>
  );
};

export default TimeSlotSelector;
