'use client';

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
    <div className="time-slot-selector w-full">
      <h2 className="text-2xl font-fraunces font-bold mb-8 text-accent-1">Select Time for {formattedDate}</h2>
      
      <div className="mb-8">
        <h3 className="font-medium text-foreground/80 mb-3">Morning</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {morningSlots.map((time) => (
            <button
              key={time}
              type="button"
              className={`p-3 text-sm font-medium border rounded-md transition-colors cursor-pointer ${
                selectedTimeSlot === time
                  ? 'bg-accent-1 text-primary border-accent-1 shadow-md'
                  : 'bg-primary text-foreground border-white/20 hover:bg-primary-light hover:border-accent-1/50'
              }`}
              onClick={() => onSelectTimeSlot(time)}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="font-medium text-foreground/80 mb-3">Afternoon</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {afternoonSlots.map((time) => (
            <button
              key={time}
              type="button"
              className={`p-3 text-sm font-medium border rounded-md transition-colors cursor-pointer ${
                selectedTimeSlot === time
                  ? 'bg-accent-1 text-primary border-accent-1 shadow-md'
                  : 'bg-primary text-foreground border-white/20 hover:bg-primary-light hover:border-accent-1/50'
              }`}
              onClick={() => onSelectTimeSlot(time)}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
      
      {selectedTimeSlot && (
        <div className="mt-8 p-5 bg-accent-1/10 border border-accent-1/20 rounded-xl">
          <p className="font-medium text-foreground text-lg mb-1">Selected Time: <span className="text-accent-1 font-bold">{selectedTimeSlot}</span></p>
          <p className="text-sm text-foreground/70">Click &quot;Continue&quot; below to complete your booking details</p>
        </div>
      )}
    </div>
  );
};

export default TimeSlotSelector;
