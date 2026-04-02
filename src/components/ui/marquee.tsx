"use client";

import React from 'react';
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import Image from 'next/image';

interface MarqueeItemProps {
  number: string;
  text: string;
}

interface MarqueeProps {
  items?: Array<{ number: string; text: string }>;
  images?: Array<{ src: string; alt: string }>;
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

const MarqueeImageItem: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  return (
    <div className="flex items-center h-full relative flex-shrink-0">
      <div className="flex items-center justify-center px-12 md:px-24 py-6 h-full">
        <div className="relative w-[120px] h-[100px] md:w-[180px] md:h-[100px]">
          <Image src={src} alt={alt} fill className="object-contain" />
        </div>
      </div>
      <div className="h-[65%] w-[1px] absolute right-0 bg-secondary mx-0.5" />
    </div>
  );
};

export const Marquee: React.FC<MarqueeProps> = ({ 
  items,
  images, 
  className, 
  speed = 0.05
}) => {
  // Calculate animation duration based on speed
  const duration = 25 / speed;
  
  // Create enough duplicates to ensure seamless loop
  const listToDuplicate = images || items || [];
  const duplicatedList = [...listToDuplicate, ...listToDuplicate, ...listToDuplicate];

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
        {duplicatedList.map((item, index) => (
          images ? (
            <MarqueeImageItem 
              key={`marquee-item-${index}`} 
              src={(item as any).src} 
              alt={(item as any).alt} 
            />
          ) : (
            <MarqueeItem 
              key={`marquee-item-${index}`} 
              number={(item as any).number} 
              text={(item as any).text} 
            />
          )
        ))}
      </motion.div>
    </div>
  );
};