"use client"

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import TimeSlotSelector from "@/components/booking/time-slot-selector";
import BookingForm, {
  BookingFormData,
} from "@/components/booking/booking-form";
import { format } from "date-fns";
import BookingCalendar from "@/components/booking/booking-calendar";

// Define booking steps
type BookingStep = "select-date" | "select-time" | "fill-form";

const Page: React.FC = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<BookingStep>("select-date");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setCurrentStep("select-time");
    // Scroll to time selection
    setTimeout(() => {
      document
        .getElementById("time-selection")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  // Handle time slot selection
  const handleTimeSlotSelect = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
    setError(null);
  };

  // Move to form step after time slot selection
  const handleContinueToForm = () => {
    if (!selectedTimeSlot) {
      // Show a message asking to select a time slot
      setError("Please select a time slot to continue");
      return;
    }

    setError(null);
    setCurrentStep("fill-form");

    // Scroll to the form
    setTimeout(() => {
      document
        .getElementById("booking-form")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  // Handle form submission
  const handleSubmit = async (formData: BookingFormData) => {
    if (!selectedDate || !selectedTimeSlot) return;

    setError(null);

    try {
      // Fix date handling by standardizing date
      const standardizedDate = new Date(
        Date.UTC(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          12, 0, 0
        )
      );
      
      const bookingData = {
        ...formData,
        date: standardizedDate.toISOString(),
        timeSlot: selectedTimeSlot,
      };

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create booking");
      }

      setSuccess(true);
      // Reset form and selection after successful submission
      setSelectedDate(null);
      setSelectedTimeSlot(null);
      setCurrentStep("select-date");

      // Redirect to success page
      setTimeout(() => {
        router.push("/book-appointment/confirmation");
      }, 2000);
    } catch (error: unknown) {
      console.error("Booking submission error:", error);
      setError(
        error instanceof Error ? error.message : "An error occurred while submitting your booking"
      );
    }
  };

  // Handle cancellation
  const handleCancel = () => {
    if (currentStep === "fill-form") {
      // Go back to time slot selection
      setCurrentStep("select-time");
      setTimeout(() => {
        document
          .getElementById("time-selection")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else if (currentStep === "select-time") {
      // Go back to date selection
      setSelectedTimeSlot(null);
      setCurrentStep("select-date");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setError(null);
  };

  // Render the progress steps indicator
  const renderProgressSteps = () => {
    return (
      <div className="mb-8 px-2 sm:px-0">
        <ol className="flex items-center w-full">
          <li
            className={`flex items-center ${
              currentStep === "select-date" ? "text-accent-1" : "text-secondary/75"
            }`}
          >
            <span
              className={`flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 transition-colors duration-300 ${
                currentStep === "select-date"
                  ? "border-accent-1 bg-accent-1/10"
                  : "border-accent-2"
              }`}
            >
              1
            </span>
            <span className="ml-1 sm:ml-2 text-xs sm:text-sm font-medium">Select Date</span>
          </li>
          <li className="flex items-center w-full">
            <span className="flex-1 h-0.5 mx-2 bg-accent-2"></span>
          </li>
          <li
            className={`flex items-center ${
              currentStep === "select-time" ? "text-accent-1" : "text-secondary/75"
            }`}
          >
            <span
              className={`flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 transition-colors duration-300 ${
                currentStep === "select-time"
                  ? "border-accent-1 bg-accent-1/10"
                  : "border-accent-2"
              }`}
            >
              2
            </span>
            <span className="ml-1 sm:ml-2 text-xs sm:text-sm font-medium">Choose Time</span>
          </li>
          <li className="flex items-center w-full">
            <span className="flex-1 h-0.5 mx-2 bg-accent-2"></span>
          </li>
          <li
            className={`flex items-center ${
              currentStep === "fill-form" ? "text-accent-1" : "text-secondary/75"
            }`}
          >
            <span
              className={`flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 transition-colors duration-300 ${
                currentStep === "fill-form"
                  ? "border-accent-1 bg-accent-1/10"
                  : "border-accent-2"
              }`}
            >
              3
            </span>
            <span className="ml-1 sm:ml-2 text-xs sm:text-sm font-medium">Complete Details</span>
          </li>
        </ol>
      </div>
    );
  };

  const renderSelectedDateCard = () => {
    if (!selectedDate) return null;
    
    return (
      <div className="bg-primary-light p-4 rounded-lg shadow-sm border border-accent-2/30 mb-6 mt-6 cursor-default">
        <h3 className="font-semibold text-lg mb-2 text-secondary">Selected Date</h3>
        <p className="text-gray-700">
          {format(selectedDate, "EEEE, MMMM d, yyyy")}
        </p>

        {selectedTimeSlot && (
          <p className="text-gray-700 mt-1">
            Time: <span className="font-medium">{selectedTimeSlot}</span>
          </p>
        )}

        <button
          onClick={() => {
            setCurrentStep("select-date");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="mt-3 text-sm text-accent-1 hover:text-accent-1/80 font-medium transition-colors cursor-pointer"
        >
          Change Date
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-primary py-8 sm:py-12 px-4 sm:px-6 lg:px-8 cursor-default">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="h2 mb-2">
            Book a Wellbeing Session
          </h1>
          <p className="mt-2 max-w-2xl mx-auto text-base sm:text-xl text-secondary/90">
            Select a date to book your wellbeing session with Conor.
          </p>
        </div>

        {renderProgressSteps()}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md">
            <p className="font-medium">Error</p>
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-md">
            <p className="font-medium">Success!</p>
            <p>
              Your booking has been submitted successfully. Redirecting to the
              confirmation page...
            </p>
          </div>
        )}

        {/* Mobile layout - Stack everything vertically */}
        {isMobile && (
          <div className="space-y-6">
            {/* Always show calendar on top for mobile */}
            <div className="bg-primary-light p-4 rounded-lg shadow-sm border border-accent-2/30 calendar-container">
              <BookingCalendar
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
              />
            </div>
            
            {/* Show selected date info if available */}
            {(currentStep === "select-time" || currentStep === "fill-form") && 
              renderSelectedDateCard()
            }
            
            {/* Time selection step */}
            {currentStep === "select-time" && selectedDate && (
              <div id="time-selection" className="bg-primary-light p-4 rounded-lg shadow-sm border border-accent-2/30">
                <TimeSlotSelector
                  date={selectedDate}
                  selectedTimeSlot={selectedTimeSlot}
                  onSelectTimeSlot={handleTimeSlotSelect}
                />
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 text-sm font-medium text-secondary bg-primary-light border border-accent-2/50 rounded-md shadow-sm hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleContinueToForm}
                    className={`px-4 py-2 text-sm font-medium text-white rounded-md shadow-sm transition-colors cursor-pointer ${
                      selectedTimeSlot
                        ? "bg-accent-1 hover:bg-accent-1/90"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                    disabled={!selectedTimeSlot}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}
            
            {/* Form step */}
            {currentStep === "fill-form" && selectedDate && (
              <div id="booking-form" className="bg-primary-light p-4 rounded-lg shadow-sm border border-accent-2/30">
                <BookingForm
                  selectedDate={selectedDate}
                  onSubmit={handleSubmit}
                  onCancel={handleCancel}
                />
                <p className="mt-3 text-center text-sm text-gray-500">
                  Selected time:{" "}
                  <span className="font-semibold">{selectedTimeSlot}</span> -
                  <button
                    onClick={() => {
                      setCurrentStep("select-time");
                      setTimeout(() => {
                        document
                          .getElementById("time-selection")
                          ?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }, 100);
                    }}
                    className="ml-1 text-accent-1 hover:text-accent-1/80 transition-colors cursor-pointer"
                  >
                    Change Time
                  </button>
                </p>
              </div>
            )}
            
            {/* Information card - always show */}
            <div className="bg-primary-light p-4 rounded-lg shadow-sm border border-accent-2/30">
              <h3 className="font-semibold text-lg mb-2 text-secondary">
                Booking Information
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Only one school can book per day</li>
                <li>
                  • You can request between 1-5 wellbeing talks for your school
                </li>
                <li>
                  • After submitting, you&apos;ll receive a confirmation email with
                  details
                </li>
                <li>
                  • You can edit or cancel your booking using the link in your
                  email
                </li>
              </ul>
            </div>
            
            {/* No date selected prompt */}
            {currentStep === "select-date" && !selectedDate && (
              <div className="bg-primary-light p-6 rounded-lg shadow-sm border border-accent-2/30 flex flex-col items-center justify-center py-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-accent-2 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-base sm:text-lg text-secondary/80 text-center">
                  Please select a date from the calendar above to continue
                </p>
              </div>
            )}
          </div>
        )}

        {/* Desktop layout - Side by side */}
        {!isMobile && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left column - stays visible throughout */}
            <div>
              <div className="bg-primary-light p-4 rounded-lg shadow-sm border border-accent-2/30 calendar-container mx-auto">
                <BookingCalendar
                  selectedDate={selectedDate}
                  onDateSelect={handleDateSelect}
                />
              </div>

              {/* Selected date info */}
              {(currentStep === "select-time" || currentStep === "fill-form") && 
                renderSelectedDateCard()
              }

              <div className="mt-6 bg-primary-light p-4 rounded-lg shadow-sm border border-accent-2/30">
                <h3 className="font-semibold text-lg mb-2 text-secondary">
                  Booking Information
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Only one school can book per day</li>
                  <li>
                    • You can request between 1-5 wellbeing talks for your school
                  </li>
                  <li>
                    • After submitting, you&apos;ll receive a confirmation email with
                    details
                  </li>
                  <li>
                    • You can edit or cancel your booking using the link in your
                    email
                  </li>
                </ul>
              </div>
            </div>

            {/* Right column - changes based on step */}
            <div>
              {/* Step 2: Time slot selection */}
              {currentStep === "select-time" && selectedDate && (
                <div id="time-selection" className="bg-primary-light p-5 rounded-lg shadow-sm border border-accent-2/30">
                  <TimeSlotSelector
                    date={selectedDate}
                    selectedTimeSlot={selectedTimeSlot}
                    onSelectTimeSlot={handleTimeSlotSelect}
                  />
                  <div className="mt-4 flex justify-between">
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 text-sm font-medium text-secondary bg-primary-light border border-accent-2/50 rounded-md shadow-sm hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleContinueToForm}
                      className={`px-4 py-2 text-sm font-medium text-white rounded-md shadow-sm transition-colors cursor-pointer ${
                        selectedTimeSlot
                          ? "bg-accent-1 hover:bg-accent-1/90"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                      disabled={!selectedTimeSlot}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Booking form */}
              {currentStep === "fill-form" && selectedDate && (
                <div id="booking-form" className="bg-primary-light p-5 rounded-lg shadow-sm border border-accent-2/30">
                  <BookingForm
                    selectedDate={selectedDate}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                  />
                  <p className="mt-3 text-center text-sm text-gray-500">
                    Selected time:{" "}
                    <span className="font-semibold">{selectedTimeSlot}</span> -
                    <button
                      onClick={() => setCurrentStep("select-time")}
                      className="ml-1 text-accent-1 hover:text-accent-1/80 transition-colors cursor-pointer"
                    >
                      Change Time
                    </button>
                  </p>
                </div>
              )}

              {/* Initial state - No date selected yet */}
              {currentStep === "select-date" && !selectedDate && (
                <div className="bg-primary-light p-6 rounded-lg shadow-sm border border-accent-2/30 flex flex-col items-center justify-center h-64">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-accent-2 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-lg text-secondary/80 text-center">
                    Please select a date from the calendar to continue
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;