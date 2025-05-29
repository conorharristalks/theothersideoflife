import { AnimatedEvents } from "@/components/ui/animated-events";

interface PastEventsProps {
  events: Array<{
    quote: string;
    name: string;
    src: string;
  }>;
}

export function PastEvents({ events }: PastEventsProps) {
  return (
    <section className="mb-20 md:mb-32 relative rounded-3xl flex flex-col justify-center items-center shadow-right bg-primary border border-secondary py-10 md:py-16 px-3 md:px-8 lg:px-12 overflow-hidden mx-[7px]">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="h2 mb-3 md:mb-4">Past Events</h2>
        <p className="body-text-lg font-bold italic max-w-2xl mx-auto px-2">
          A glimpse into some of my previous events and workshops that have made a difference.
        </p>
      </div>
      
      <div className="w-full max-w-5xl mx-auto">
        {/* Set autoplay to false if you want only manual navigation */}
        <AnimatedEvents events={events} autoplay={false} />
      </div>
      
      {/* Elegant background shapes */}
      <div className="absolute top-0 right-0 w-24 md:w-40 h-24 md:h-40 bg-accent-1 opacity-90 rounded-full transform translate-x-1/2 -translate-y-1/2"/>
      <div className="absolute bottom-0 left-0 w-36 md:w-60 h-36 md:h-60 bg-accent-2 opacity-85 rounded-full transform -translate-x-1/2 translate-y-1/2"/>
      
      {/* Subtle decorative elements - hidden on small screens */}
      <div className="absolute top-1/2 left-10 w-10 md:w-16 h-10 md:h-16 border border-secondary opacity-85 rotate-45 transform hidden sm:block"/>
      <div className="absolute bottom-20 right-10 w-8 md:w-12 h-8 md:h-12 border border-secondary opacity-85 rotate-12 transform hidden sm:block"/>
    </section>
  );
}
