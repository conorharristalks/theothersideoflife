"use client";

import React, { useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface MarqueeItemProps {
  number: string;
  text: string;
}

interface MarqueeProps {
  items: Array<{ number: string; text: string }>;
  className?: string;
  speed?: number;
}

const MarqueeItem: React.FC<MarqueeItemProps> = ({ 
  number, 
  text
}) => {
  return (
    <div className="flex items-center h-full relative">
      <div className="flex flex-col items-start justify-center px-16 py-6">
        <span className="font-fraunces text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">{number}</span>
        <span className="font-baskerville text-base md:text-lg font-semibold text-foreground mt-2">{text}</span>
      </div>
      {/* Using HR element for a more visible divider */}
      <div className="h-[65%] w-[1px] absolute right-0 bg-secondary mx-0.5" />
    </div>
  );
};

export const Marquee: React.FC<MarqueeProps> = ({ 
  items, 
  className, 
  speed = 0.05 // Very slow speed to match image
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!scrollerRef.current) return;
    
    // Get width of the scroller container
    const scrollerContainer = scrollerRef.current;
    
    // Detect if on mobile
    const isMobile = window.innerWidth < 768;
    
    // Clone enough items to ensure no gaps
    const itemsToClone = Math.ceil(window.innerWidth / (scrollerContainer.scrollWidth / items.length)) + (isMobile ? 2 : 1);
    
    // Clear existing clones first (in case of re-renders)
    const originalChildren = Array.from(scrollerContainer.children).slice(0, items.length);
    scrollerContainer.innerHTML = '';
    
    // Re-add original items
    originalChildren.forEach(child => {
      scrollerContainer.appendChild(child.cloneNode(true));
    });
    
    // Add enough clones to fill the screen with no gaps
    for (let i = 0; i < itemsToClone; i++) {
      originalChildren.forEach(item => {
        const duplicatedItem = item.cloneNode(true);
        scrollerContainer.appendChild(duplicatedItem);
      });
    }
    
    // Calculate the exact percentage to move for seamless looping
    // This needs to be the width of precisely the number of original items
    const exactPercentage = (items.length * 100) / scrollerContainer.children.length;
    
    // Add the animation with proper timing - changed to scroll right instead of left
    const scrollerAnimation = scrollerContainer.animate(
      [
        { transform: `translateX(-${exactPercentage}%)` }, // Start from negative position
        { transform: "translateX(0)" }                     // Move to zero (right direction)
      ],
      {
        duration: 25000 / speed,
        iterations: Infinity,
        easing: "linear"
      }
    );
    
    // Force hardware acceleration on mobile devices to improve performance
    if (isMobile) {
      scrollerContainer.style.transform = 'translateZ(0)';
      scrollerContainer.style.willChange = 'transform';
    }
    
    // Pause animation when not in viewport or tab is not active
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          scrollerAnimation.play();
        } else {
          scrollerAnimation.pause();
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(scrollerContainer);
    
    // Pause when tab is not active
    const handleVisibilityChange = () => {
      if (document.hidden) {
        scrollerAnimation.pause();
      } else {
        scrollerAnimation.play();
      }
    };
    
    document.addEventListener("visibilitychange", handleVisibilityChange);
    
    // Handle orientation changes on mobile
    const handleOrientationChange = () => {
      if (isMobile) {
        // Give browser time to calculate new dimensions
        setTimeout(() => {
          scrollerAnimation.cancel();
          // Force a re-render by changing a ref value
          scrollerRef.current?.classList.toggle('orientation-changed');
          scrollerRef.current?.classList.toggle('orientation-changed');
        }, 100);
      }
    };
    
    window.addEventListener('orientationchange', handleOrientationChange);
    
    return () => {
      scrollerAnimation.cancel();
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, [speed, items]);
  
  return (
    <div className={cn(
      "w-full overflow-hidden bg-primary border-y border-secondary", 
      className
    )}>
      <div className="flex relative w-max" ref={scrollerRef}>
        {items.map((item, index) => (
          <MarqueeItem 
            key={`marquee-item-${index}`} 
            number={item.number} 
            text={item.text} 
          />
        ))}
      </div>
    </div>
  );
};