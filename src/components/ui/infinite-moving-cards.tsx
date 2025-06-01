"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
    stars?: number;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [start, setStart] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Check if the viewport is mobile-sized
  const checkIfMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    // Initial check on mount
    checkIfMobile();
    
    // Add window resize listener
    window.addEventListener("resize", checkIfMobile);
    
    // Initialize animations
    addAnimation();
    
    // Cleanup
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Touch handlers for mobile pause
  const handleTouchStart = () => {
    setIsPaused(true);
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
  };

  // Re-apply speed when mobile state changes
  useEffect(() => {
    getSpeed();
  }, [isMobile]);
  
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards",
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse",
        );
      }
    }
  };
  
  const getSpeed = () => {
    if (containerRef.current) {
      // Faster speed on mobile, slower on desktop
      if (isMobile) {
        // Mobile speeds
        if (speed === "fast") {
          containerRef.current.style.setProperty("--animation-duration", "15s");
        } else if (speed === "normal") {
          containerRef.current.style.setProperty("--animation-duration", "25s");
        } else {
          containerRef.current.style.setProperty("--animation-duration", "40s");
        }
      } else {
        // Desktop speeds
        if (speed === "fast") {
          containerRef.current.style.setProperty("--animation-duration", "25s");
        } else if (speed === "normal") {
          containerRef.current.style.setProperty("--animation-duration", "40s");
        } else {
          containerRef.current.style.setProperty("--animation-duration", "80s");
        }
      }
    }
  };
  
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 mx-auto overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_3%,white_97%,transparent)]",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-8 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
          isPaused && "[animation-play-state:paused]"
        )}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {items.map((item, idx) => (
          <li
            className="md:w-[450px] w-[350px] flex-shrink-0 flex-grow-0 bg-primary p-6 rounded-xl border border-secondary shadow-left"
            key={`${item.name}-${idx}`}
          >
            <div className="flex flex-col h-full justify-between gap-4">
              {/* Stars display */}
              <div className="h-6">
                {item.stars && (
                  <div className="flex items-center gap-2">
                    {[...Array(item.stars)].map((_, starIdx) => (
                      <span key={starIdx} className="text-accent-1 text-lg">
                        ★
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Quote - using min-height to ensure consistent space */}
              <div className="flex-grow">
                <p className="body-text italic font-nunito text-foreground break-words">
                  &quot;{item.quote}&quot;
                </p>
              </div>
              
              {/* Author info - fixed height section */}
              <div className="mt-4 h-14 flex flex-col justify-end">
                <p className="font-fraunces font-semibold text-foreground">{item.name}</p>
                <p className="body-text-sm text-foreground font-nunito">{item.title}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
