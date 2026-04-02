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
      showOutsideDays={false}
      fixedWeeks={false}
      className={cn("p-3", className)}
      weekStartsOn={0}
      classNames={{
        months: "flex flex-col sm:flex-row w-full",
        month: "space-y-4 w-full",
        caption: "relative flex w-full justify-center items-center px-2 pb-2",
        caption_label: "text-sm font-medium mx-2 text-center min-w-[120px] text-foreground", 
        nav: "flex items-center gap-1 space-x-1",
        nav_button: "size-8 bg-primary border border-white/20 text-foreground p-0 opacity-70 hover:opacity-100 hover:bg-primary-light transition-colors rounded-md flex items-center justify-center cursor-pointer",
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex w-full",
        head_cell:
          "text-foreground/60 rounded-md w-9 font-normal text-[0.8rem] flex items-center justify-center",
        row: "flex w-full mt-2 justify-start",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 w-9 h-9",
          "[&:has([aria-selected])]:bg-transparent",
          "[&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: "size-10 p-0 font-medium text-foreground hover:bg-accent-1 hover:text-primary transition-all ease-in duration-150 rounded-md cursor-pointer flex justify-center items-center",
        day_range_start:
          "day-range-start aria-selected:bg-accent-1 aria-selected:text-primary hover:bg-accent-1 hover:text-primary",
        day_range_end:
          "day-range-end aria-selected:bg-accent-1 aria-selected:text-primary hover:bg-accent-1 hover:text-primary",
        day_selected:
          "bg-accent-1 !text-primary hover:bg-accent-1 hover:!text-primary focus:bg-accent-1 focus:!text-primary font-bold",
        day_today: "border border-accent-1/50 bg-primary-light text-foreground",
        day_outside: "hidden",
        day_disabled: "text-foreground/20 opacity-50 cursor-not-allowed hover:bg-transparent hover:text-foreground/20",
        day_range_middle:
          "aria-selected:bg-accent-1 aria-selected:text-primary hover:bg-accent-1 hover:text-primary",
        day_hidden: "hidden",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className: iconClassName, ...iconProps }) => (
          <ChevronLeft className={cn("size-4 cursor-pointer", iconClassName)} {...iconProps} />
        ),
        IconRight: ({ className: iconClassName, ...iconProps }) => (
          <ChevronRight className={cn("size-4 cursor-pointer", iconClassName)} {...iconProps} />
        ),
      }}
      {...props}
    />
  )
}

export { Calendar }