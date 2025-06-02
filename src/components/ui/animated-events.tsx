"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState, useRef } from "react";
import { InteractiveButton } from "@/components/ui/buttons/interactive-button";

type Event = {
  quote: string;
  name: string;
  src: string;
};

export const AnimatedEvents = ({
  events,
  autoplay = false,
}: {
  events: Event[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);
  const isClient = useRef(false);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % events.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + events.length) % events.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    // Mark that we're on the client
    isClient.current = true;

    if (autoplay) {
      const interval = setInterval(handleNext, 8000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    // Only return random values after initial mount to prevent hydration mismatch
    if (isClient.current) {
      return Math.floor(Math.random() * 21) - 10;
    }
    return 0; // Use a consistent initial value
  };

  return (
    <div className="w-full font-nunito antialiased">
      <div className="relative grid grid-cols-1 gap-10 sm:gap-16 md:gap-20 lg:gap-36 lg:grid-cols-2">
        <div className="flex items-center justify-center">
          <div className="relative aspect-square w-full max-w-md">
            <AnimatePresence>
              {events.map((event, index) => (
                <motion.div
                  key={event.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.9,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index) ? 40 : events.length + 2 - index,
                    y: isActive(index) ? [0, -30, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom rounded-2xl border-2 border-secondary"
                >
                  <img
                    loading="lazy"
                    src={event.src}
                    alt={event.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full aspect-square object-cover object-center rounded-2xl border-2 border-secondary"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col justify-between h-full py-2 sm:py-4">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
            className="mb-6 sm:mb-8"
          >
            <h3 className="h3 mb-3 sm:mb-4 font-fraunces">
              {events[active].name}
            </h3>
            <motion.p className="body-text font-semibold">
              {events[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="flex flex-col gap-6 sm:gap-8 mt-auto">
            <div className="flex gap-4">
              <button
                onClick={handlePrev}
                className="group/button flex h-10 w-10 items-center justify-center rounded-full bg-primary border border-secondary transition-all hover:bg-accent-1"
              >
                <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6 text-secondary transition-transform duration-300 group-hover/button:text-primary group-hover/button:rotate-12" />
              </button>
              <button
                onClick={handleNext}
                className="group/button flex h-10 w-10 items-center justify-center rounded-full bg-primary border border-secondary transition-all hover:bg-accent-1"
              >
                <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 text-secondary transition-transform duration-300 group-hover/button:text-primary group-hover/button:-rotate-12" />
              </button>
            </div>
            <div className="text-left">
              <InteractiveButton
                variant="filled"
                text="Book a talk with me"
                className="md:w-64 w-full z-99 py-3 sm:py-4 border-0 hover:border-0 text-primary transition-all ease-in duration-100 bg-accent-1"
                ballClassName="lg:left-[7%] left-[15%]"
                href="/book-appointment"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add default export to work with dynamic import
export default { AnimatedEvents };
