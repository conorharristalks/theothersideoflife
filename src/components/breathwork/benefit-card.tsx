"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

interface BenefitCardProps {
  id: number;
  title: React.ReactNode;
  description: string;
  icon: string;
  shadowDirection: "left" | "right";
  expandedContent: {
    description: string;
    listItems: string[];
  };
}

const BenefitCard: React.FC<BenefitCardProps> = ({
 
  title,
  description,
  icon,
  shadowDirection,
  expandedContent,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div 
      className={`bg-primary-light rounded-xl p-6 lg:p-8 border border-secondary relative overflow-hidden 
      ${shadowDirection === "right" ? "shadow-right" : "shadow-left"} flex flex-col h-full`}
    >
      <div className="flex justify-between">
        <h3 className="text-xl lg:text-2xl font-fraunces font-semibold mb-4">
          {title}
        </h3>
        <div className="w-12 h-12 lg:w-17 lg:h-17">
          <Image
            src={icon}
            width={56}
            height={56}
            alt="Benefit icon"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      <p className="text-secondary font-nunito">
        {description}
      </p>

      {/* Expandable content */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isExpanded ? "max-h-[400px] opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-secondary font-nunito">
          {expandedContent.description}
        </p>
        <ul className="mt-4 list-disc pl-5 text-secondary font-nunito">
          {expandedContent.listItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="mt-auto pt-8">
        <button
          onClick={toggleExpand}
          className="flex items-center text-accent-1 font-semibold text-sm gap-2 hover:text-accent-1/80 transition-colors cursor-pointer"
        >
          {isExpanded ? "Show Less" : "Read More"}
          <div className="w-5 h-5 rounded-full bg-accent-1 flex items-center justify-center p-1 transition-transform duration-300">
            {isExpanded ? (
              <ArrowUp className="text-primary" />
            ) : (
              <ArrowDown className="text-primary" />
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default BenefitCard;
