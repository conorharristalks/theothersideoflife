"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useState } from "react";

import { ArrowDown, ArrowUp } from "lucide-react";

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

const BenefitCard = ({
  title,
  description,
  icon,
  shadowDirection,
  expandedContent,
}: BenefitCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      className={`bg-primary p-6 md:p-8 rounded-2xl border-2 border-secondary/30 shadow-${shadowDirection} relative overflow-hidden h-full`}
      transition={{ duration: 0.2 }}
      layout={false}
    >
      <div className="flex flex-col h-full justify-between">
        <div>
          {/* Header Section with Icon and Title */}
          <div className="flex items-start gap-4 mb-4">
            <motion.div
              className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0"
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src={icon}
                alt={`${title} icon`}
                width={64}
                height={64}
                className="w-full h-full object-contain"
              />
            </motion.div>

            <h3 className="text-xl md:text-2xl font-fraunces font-bold text-secondary">
              {title}
            </h3>
          </div>

          {/* Base Description - Always Visible */}
          <p className="font-nunito text-secondary mb-4">{description}</p>

          {/* Expanded Content - with AnimatePresence for smooth exit animations */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="mt-4 pt-4 border-t border-secondary/20 overflow-hidden"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <motion.p
                  className="font-nunito text-secondary mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {expandedContent.description}
                </motion.p>

                <motion.ul className="list-disc pl-5 space-y-2">
                  {expandedContent.listItems.map((item, index) => (
                    <motion.li
                      key={index}
                      className="font-nunito text-secondary"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Toggle Button with original arrow implementation */}
        <div className="mt-4 pt-2">
          <button
            className="text-accent-1 font-nunito font-semibold flex items-center gap-2 self-start cursor-pointer"
            onClick={toggleExpand}
          >
            {isExpanded ? "Show Less" : "Learn More"}
            <div className="w-5 h-5 rounded-full bg-accent-1 flex items-center justify-center p-1 transition-all">
              {isExpanded ? (
                <ArrowUp className="text-primary" />
              ) : (
                <ArrowDown className="text-primary" />
              )}
            </div>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BenefitCard;
