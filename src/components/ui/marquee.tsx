"use client";

import React from 'react';
import { motion } from "motion/react";
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
    <div className="flex items-center h-full relative flex-shrink-0">
      <div className="flex flex-col items-start justify-center px-16 py-6">
        <span className="font-fraunces text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">{number}</span>
        <span className="font-baskerville text-base md:text-lg font-semibold text-foreground mt-2">{text}</span>
      </div>
      <div className="h-[65%] w-[1px] absolute right-0 bg-secondary mx-0.5" />
    </div>
  );
};

export const Marquee: React.FC<MarqueeProps> = ({ 
  items, 
  className, 
  speed = 0.05
}) => {
  // Calculate animation duration based on speed
  const duration = 25 / speed;
  
  // Create enough duplicates to ensure seamless loop
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className={cn(
      "w-full overflow-hidden bg-primary border-y border-secondary", 
      className
    )}>
      <motion.div 
        className="flex w-max"
        animate={{
          x: [0, -100 / 3 + "%"], // Move by exactly one set of items (1/3 of total width)
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: duration,
            ease: "linear",
          },
        }}
        style={{
          willChange: "transform", // Optimize for animations
        }}
      >
        {duplicatedItems.map((item, index) => (
          <MarqueeItem 
            key={`marquee-item-${index}`} 
            number={item.number} 
            text={item.text} 
          />
        ))}
      </motion.div>
    </div>
  );
};