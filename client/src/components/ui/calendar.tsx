import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, NextMonthButtonProps, PreviousMonthButtonProps } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-2", className)}
      classNames={{
        month: "space-y-4",
        month_caption: "relative",
        caption_label: "text-md font-semibold",
        // nav: "absolute right-4 top-5",
        // nav_button: cn(buttonVariants({ variant: "outline" }), "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"),
        button_previous: "hover:bg-zinc-100 p-2 ",
        button_next: "hover:bg-zinc-100 p-2",
        // month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex",
        weekday: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        week: "flex w-full mt-2",
        // day: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(buttonVariants({ variant: "ghost" }), "h-9 w-9 p-0 font-normal aria-selected:opacity-100"),
        range_end: "day-range-end",
        today: "bg-emerald-500 text-white",
        outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        disabled: "text-muted-foreground opacity-50",
        range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        hidden: "invisible",
        selected: "bg-zinc-200 hover:bg-zinc-300 border-[0.8px] border-zinc-500",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }: NextMonthButtonProps) => <ChevronLeft size={16} />,
        IconRight: ({ ...props }: PreviousMonthButtonProps) => <ChevronRight size={16} />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
