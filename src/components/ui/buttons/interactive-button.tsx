"use client"
import React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  variant?: "transparent" | "filled";
  ballClassName?: string;
  textClassName?: string;
  ballPosition?: {
    left?: string;
    top?: string;
  };
}

const InteractiveButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveButtonProps
>(({ 
  text = "Button", 
  className, 
  variant = "transparent",
  ballClassName,
  textClassName,
  ballPosition,
  ...props 
}, ref) => {
  // Define styling based on variant
  const isTransparent = variant === "transparent";
  
  return (
    <button
      ref={ref}
      className={cn(
        "group relative w-48 cursor-pointer overflow-hidden rounded-xl border-2 border-accent-1 text-center button-blue-shadow transition-all",
        isTransparent ? "bg-transparent button-shadow hover:border-2" : "hover:border-2",
        className,
      )} 
      {...props}
    >
      <span className={cn(
        "inline-block translate-x-1 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 font-semibold font-baskerville",
        textClassName
      )}>
        {text}
      </span>
      <div className={cn(
        "absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100 font-semibold font-baskerville",
        isTransparent ? "text-background" : "text-foreground",
        textClassName
      )}>
        <span>{text}</span>
        <ArrowUpRight/>
      </div>
      <div 
        className={cn(
          "absolute h-4 w-4 scale-[1] rounded-lg transition-all duration-300 group-hover:left-[0%] group-hover:top-[0%] group-hover:h-full group-hover:w-full group-hover:scale-[1.8] left-[13%] top-[35%]",
          isTransparent ? "bg-accent-1" : "bg-accent-2",
          ballClassName
        )}
        style={ballPosition ? {
          left: ballPosition.left,
          top: ballPosition.top
        } : undefined}
      ></div>
    </button>
  );
});

InteractiveButton.displayName = "InteractiveButton";

export { InteractiveButton };
