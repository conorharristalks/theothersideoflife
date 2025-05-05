import React from "react";
import { ArrowRight, ArrowUpRight, MoveUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = "Button", className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group relative w-48 cursor-pointer overflow-hidden rounded-xl bg-transparent border-2 border-accent-1 text-center button-shadow",
        className,
      )}
      {...props}
    >
      <span className="inline-block translate-x-1 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 font-semibold font-baskerville">
        {text}
      </span>
      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-background opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100 font-semibold font-baskerville">
        <span>{text}</span>
        <ArrowUpRight/>
      </div>
      <div className="absolute left-[13%] top-[35%] h-4 w-4 scale-[1] rounded-lg bg-accent-1 transition-all duration-300 group-hover:left-[0%] group-hover:top-[0%] group-hover:h-full group-hover:w-full group-hover:scale-[1.8] group-hover:bg-primary"></div>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
