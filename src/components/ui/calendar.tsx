"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={false} // Always hide outside days
      fixedWeeks={false} // Don't fix weeks - let them adjust naturally
      className={cn("p-3", className)}
      weekStartsOn={0} // Start week on Sunday - this helps with the layout
      classNames={{
        months: "flex flex-col sm:flex-row w-full",
        month: "space-y-4 w-full",
        caption: "relative flex w-full justify-center items-center px-2 pb-2",
        caption_label: "text-sm font-medium mx-2 text-center min-w-[120px]", 
        nav: "flex items-center gap-1 space-x-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100 cursor-pointer"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex w-full",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] flex items-center justify-center",
        row: "flex w-full mt-2 justify-start", // Changed to justify-start
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 w-9 h-9",
          "[&:has([aria-selected])]:bg-accent",
          "[&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "size-9 p-0 font-normal aria-selected:opacity-100 cursor-pointer hover:bg-accent-1 hover:text-primary transition-all ease-in duration-150"
        ),
        day_range_start:
          "day-range-start aria-selected:bg-accent-1 aria-selected:text-primary hover:bg-accent-1 hover:text-primary",
        day_range_end:
          "day-range-end aria-selected:bg-accent-1 aria-selected:text-primary hover:bg-accent-1 hover:text-primary",
        day_selected:
          "bg-accent-1 text-primary hover:bg-accent-1 hover:text-primary focus:bg-accent-1 focus:text-primary",
        day_today: "bg-accent text-accent-foreground font-semibold hover:bg-accent-1 hover:text-primary",
        day_outside: "hidden", // Completely hide outside days
        day_disabled: "text-muted-foreground opacity-50 cursor-not-allowed hover:bg-transparent hover:text-muted-foreground",
        day_range_middle:
          "aria-selected:bg-accent-1 aria-selected:text-primary hover:bg-accent-1 hover:text-primary",
        day_hidden: "hidden", // Make sure hidden days are truly hidden
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, ...props }) => {
          const Icon = orientation === "left" ? ChevronLeft : ChevronRight;
          return <Icon className="size-4 cursor-pointer" {...props} />;
        }
      }}
      {...props}
    />
  )
}

export { Calendar }
