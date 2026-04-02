"use client"

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import BookingCalendar from "@/components/booking/booking-calendar";
import BookingForm, {
  BookingFormData,
} from "@/components/booking/booking-form";
import TimeSlotSelector from "@/components/booking/time-slot-selector";
import { format } from "date-fns";
import Image from "next/image";
import { StatsMarquee } from "@/components/sections/home/StatsMarquee";
import { InteractiveButton } from "@/components/ui/buttons/interactive-button";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { PastEvents } from "@/components/sections/home/PastEvents";
import { testimonialData } from "@/lib/constants";

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
    } else if (currentStep === "select-time") {
      // Go back to date selection
      setSelectedTimeSlot(null);
      setCurrentStep("select-date");
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
              currentStep === "select-date" ? "text-accent-1" : "text-foreground/80"
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
              currentStep === "select-time" ? "text-accent-1" : "text-foreground/80"
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
              currentStep === "fill-form" ? "text-accent-1" : "text-foreground/80"
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
      <div className="bg-primary-light p-6 rounded-3xl shadow-sm border border-white/10 mb-6 mt-6 cursor-default text-foreground">
        <h3 className="font-fraunces font-bold text-xl mb-2 text-accent-1">Selected Date</h3>
        <p className="font-nunito font-semibold">
          {format(selectedDate, "EEEE, MMMM d, yyyy")}
        </p>

        {selectedTimeSlot && (
          <p className="mt-1 font-nunito font-semibold text-foreground/90">
            Time: <span className="font-bold text-foreground">{selectedTimeSlot}</span>
          </p>
        )}

        <button
          onClick={() => {
            setCurrentStep("select-date");
          }}
          className="mt-3 text-sm text-accent-1 hover:text-accent-1/80 font-bold transition-colors cursor-pointer"
        >
          Change Date
        </button>
      </div>
    );
  };

  const statsData = [
    { number: "6+", text: "Years Sober" },
    { number: "150+", text: "Schools Visited" },
    { number: "10,000+", text: "Students Reached" },
    { number: "300+", text: "Hours Breathwork" },
  ];

  // Mock data for the sections below
  const eventsData = [
    {
      quote: "Conor's talk was exactly what our students needed to hear. Honest and impactful.",
      name: "St. Mary's Secondary School",
      src: "/conor-about-2.jpeg",
    },
    {
      quote: "A powerful message delivered with incredible vulnerability.",
      name: "Local GAA Club",
      src: "/conor-public-speaking-1.png",
    },
    {
      quote: "The students were engaged from start to finish. Highly recommend.",
      name: "Youth Community Centre",
      src: "/conor-group-breathwork.png",
    },
  ];

 

  return (
    <div className="min-h-screen bg-primary cursor-default flex flex-col w-full overflow-x-hidden">
      {/* New Hero Section */}
      <section className="w-full bg-primary py-8 lg:py-12 border-b-4 border-b-secondary relative">
        <div className="lg:px-[2vw] md:px-[2.5vw] px-[3.5vw] mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
              <div className="relative aspect-square w-full max-w-[400px] lg:max-w-[500px] rounded-full overflow-hidden">
                <Image src="/talks-logo.svg" alt="The Other Side of Life Logo" fill className="object-cover" />
              </div>
            </div>
            <div className="w-full lg:w-1/2 flex flex-col items-center text-center lg:items-start lg:text-left gap-6 lg:pl-8">
              <p className="text-accent-1 font-bold tracking-widest text-sm md:text-base uppercase font-nunito">The Other Side Of Life</p>
              <h1 className="h1 text-foreground font-fraunces">Conor Harris</h1>
              <p className="text-foreground/80 font-bold tracking-widest text-sm md:text-base font-nunito">SPEAKER &bull; EDUCATOR &bull; ADVOCATE</p>
              <p className="text-foreground/90 font-nunito text-lg max-w-lg leading-relaxed font-semibold">
                As a recovered drug user, I share my powerful story and insights through engaging talks with schools, GAA clubs, youth centres, and corporations. Featured on multiple TV media, I aim to inspire, educate, and bring a fresh perspective to your audience.
              </p>
              <div className="mt-4">
                <InteractiveButton
                  variant="transparent"
                  text="Book a talk"
                  className="md:w-56 w-44 py-3 transition-all ease-in duration-100"
                  ballClassName="left-[13%] top-[35%]"
                  textClassName="text-foreground"
                  href="#booking-section"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Stats Marquee */}
      <StatsMarquee statsData={statsData} />

      <div id="booking-section" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="h2 mb-4 text-accent-1">
            What I Offer
          </h2>
          <p className="mt-2 max-w-4xl mx-auto text-base sm:text-xl text-foreground/80 font-nunito font-semibold">
            Whether you&apos;re looking to empower young minds or create positive change in your organisation, I&apos;d love to be part of it.
          </p>
        </div>

        {/* Speaking Services Information Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Single Talk Card */}
            <div className="bg-primary-light text-foreground border border-white/10 rounded-3xl p-6 lg:p-8">
              <div className="mb-6">
                <h3 className="h3 font-fraunces font-bold text-foreground mb-4">
                  Single Talk - 1 hour
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-accent-1 text-xl mt-1">•</span>
                    <p className="font-nunito font-semibold text-foreground/80">
                      <strong className="text-foreground">Customised Content:</strong> Expect a talk crafted for your audience, ensuring maximum impact
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-accent-1 text-xl mt-1">•</span>
                    <p className="font-nunito font-semibold text-foreground/80">
                      <strong className="text-foreground">Interactive Elements:</strong> Engaging Q&A session, small group discussions, and 1-on-1 chats after the talk
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-accent-1 text-xl mt-1">•</span>
                    <p className="font-nunito font-semibold text-foreground/80">
                      <strong className="text-foreground">Authentic Story:</strong> Hear a powerful and relatable personal journey shared with honesty and vulnerability
                    </p>
                  </div>
                </div>
                <p className="mt-6 font-nunito font-semibold text-foreground/70 text-sm">
                  Whether I&apos;m addressing students, colleagues, or community members,
                  the core message is tailored to connect with everyone in the room.
                </p>
              </div>
            </div>

            {/* Talk + Workshop Package Card - Recommended */}
            <div className="bg-primary-light text-foreground border border-accent-1 rounded-3xl p-6 lg:p-8 relative">
              {/* Recommended Badge */}
              <div className="absolute -top-3 right-6">
                <span className="bg-accent-1 text-white px-4 py-1 rounded-full text-sm font-bold font-nunito shadow-sm">
                  Recommended
                </span>
              </div>
              
              <div className="mb-6">
                <h3 className="h3 font-fraunces font-bold text-foreground mb-4">
                  Talk + Workshop Package - 2 hours
                </h3>
                <p className="mb-6 font-nunito font-semibold text-foreground/80">
                  For a deeper dive and a more hands-on experience, this 2-hour session{" "}
                  <strong className="text-foreground">combines the talk (as described previously) with a practical workshop</strong>{" "}
                  designed specifically for students to apply its core messages and
                  explore them in greater detail, helping them integrate these lessons into their everyday lives:
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-accent-1 text-xl mt-1">•</span>
                    <p className="font-nunito font-semibold text-foreground/80">
                      Understanding and applying your core values, and learning how they shape decisions
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-accent-1 text-xl mt-1">•</span>
                    <p className="font-nunito font-semibold text-foreground/80">
                      Gain insights into your &quot;shadow&quot; and &quot;persona&quot; to foster self-awareness and personal growth
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-accent-1 text-xl mt-1">•</span>
                    <p className="font-nunito font-semibold text-foreground/80">
                      Engage in practical exercises that delve deeper into themes explored in the talk
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
            <div className="bg-primary-light p-6 rounded-3xl text-foreground shadow-sm border border-white/10 calendar-container">
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
              <div id="time-selection" className="bg-primary-light p-6 rounded-3xl text-foreground shadow-sm border border-white/10">
                <TimeSlotSelector
                  date={selectedDate}
                  selectedTimeSlot={selectedTimeSlot}
                  onSelectTimeSlot={handleTimeSlotSelect}
                />
                <div className="mt-6 flex justify-between">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 text-sm font-bold text-foreground bg-primary border border-white/20 rounded-md shadow-sm hover:bg-primary-light transition-colors cursor-pointer"
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
              <div id="booking-form" className="bg-primary-light p-6 rounded-3xl text-foreground shadow-sm border border-white/10">
                <BookingForm
                  selectedDate={selectedDate}
                  onSubmit={handleSubmit}
                  onCancel={handleCancel}
                />
                <p className="mt-4 text-center text-sm font-semibold text-foreground/80">
                  Selected time:{" "}
                  <span className="font-bold text-accent-1">{selectedTimeSlot}</span> -
                  <button
                    onClick={() => {
                      setCurrentStep("select-time");
                      setTimeout(() => {
                        document
                          .getElementById("time-selection")
                          ?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }, 100);
                    }}
                    className="ml-1 text-accent-1 hover:text-accent-1/80 font-bold transition-colors cursor-pointer"
                  >
                    Change Time
                  </button>
                </p>
              </div>
            )}
            
            {/* Information card - always show */}
            <div className="bg-primary-light p-6 rounded-3xl text-foreground shadow-sm border border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
                <h3 className="font-fraunces font-bold text-xl text-accent-1">
                  Booking Information
                </h3>
                <a
                  href="https://docs.google.com/document/d/1fimZyxR1sk852o0_KmXEYQA26kS_2_ib/edit?usp=drivesdk&ouid=101349312426059065008&rtpof=true&sd=true"
                  className="text-sm text-accent-1 hover:text-accent-1/80 font-bold transition-colors cursor-pointer underline sm:ml-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Check out my leaflet for more information about the talk
                </a>
              </div>
              <ul className="space-y-3 text-sm font-semibold text-foreground/80">
                <li>• Only one school can book per day</li>
                <li>
                  • You can request between 1-3 wellbeing talks for your school
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
              <div className="bg-primary-light p-8 rounded-3xl text-foreground shadow-sm border border-white/10 flex flex-col items-center justify-center py-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-14 w-14 text-accent-1 mb-4"
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
                <p className="text-base sm:text-lg font-semibold text-center">
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
              <div className="bg-primary-light p-6 rounded-3xl text-foreground shadow-sm border border-white/10 calendar-container mx-auto">
                <BookingCalendar
                  selectedDate={selectedDate}
                  onDateSelect={handleDateSelect}
                />
              </div>

              {/* Selected date info */}
              {(currentStep === "select-time" || currentStep === "fill-form") && 
                renderSelectedDateCard()
              }

              <div className="mt-8 bg-primary-light p-6 rounded-3xl text-foreground shadow-sm border border-white/10">
                <div className="flex flex-col gap-2 mb-4">
                  <h3 className="font-fraunces font-bold text-xl text-accent-1">
                    Booking Information
                  </h3>
                  <a
                    href="https://docs.google.com/document/d/1fimZyxR1sk852o0_KmXEYQA26kS_2_ib/edit?usp=drivesdk&ouid=101349312426059065008&rtpof=true&sd=true"
                    className="text-sm text-accent-1 hover:text-accent-1/80 font-bold transition-colors cursor-pointer underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Check out my leaflet for more information about the talk
                  </a>
                </div>
                <ul className="space-y-3 text-sm font-semibold text-foreground/80">
                  <li>• Only one school can book per day</li>
                  <li>
                    • You can request between 1 or 2 recovery talks for your school
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
                <div id="time-selection" className="bg-primary-light p-8 rounded-3xl text-background shadow-sm border border-white/10">
                  <TimeSlotSelector
                    date={selectedDate}
                    selectedTimeSlot={selectedTimeSlot}
                    onSelectTimeSlot={handleTimeSlotSelect}
                  />
                  <div className="mt-8 flex justify-between">
                    <button
                      onClick={handleCancel}
                      className="px-6 py-2.5 text-sm font-bold text-foreground bg-primary border border-white/20 rounded-md shadow-sm hover:bg-primary-light transition-colors cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleContinueToForm}
                      className={`px-6 py-2.5 text-sm font-medium text-white rounded-md shadow-sm transition-colors cursor-pointer ${
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
                <div id="booking-form" className="bg-primary-light p-8 rounded-3xl text-foreground shadow-sm border border-white/10">
                  <BookingForm
                    selectedDate={selectedDate}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                  />
                  <p className="mt-6 text-center text-sm font-semibold text-foreground/80">
                    Selected time:{" "}
                    <span className="font-bold text-accent-1">{selectedTimeSlot}</span> -
                    <button
                      onClick={() => setCurrentStep("select-time")}
                      className="ml-1 text-accent-1 hover:text-accent-1/80 font-bold transition-colors cursor-pointer"
                    >
                      Change Time
                    </button>
                  </p>
                </div>
              )}

              {/* Initial state - No date selected yet */}
              {currentStep === "select-date" && !selectedDate && (
                <div className="bg-primary-light p-8 rounded-3xl text-foreground shadow-sm border border-white/10 flex flex-col items-center justify-center h-64">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-accent-1 mb-6"
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
                  <p className="text-lg font-semibold text-center">
                    Please select a date from the calendar to continue
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>


      <div className="mt-16">
          <Testimonials testimonialData={testimonialData} />
        </div>

      {/* Past Events & Testimonials Section */}
      <div className="w-[80%] mx-auto pt-12 pb-24 flex flex-col overflow-hidden">
        <PastEvents events={eventsData} />
        
      </div>
    </div>
  );
};

export default Page;