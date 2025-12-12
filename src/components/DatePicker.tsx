import { CalendarIcon, ChevronRight } from "lucide-react";
import { subDays, subYears, startOfDay } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDateFilter } from "@/contexts/DateFilterContext";
import { ChevronDown } from "lucide-react";
type DatePreset = "today" | "last_month" | "last_year" | "custom";

export default function DatePicker() {
  const { date, setDate, preset, setPreset, formatDateRange } = useDateFilter();
  const [isOpen, setIsOpen] = useState(false);

  const handlePresetChange = (value: DatePreset) => {
    setPreset(value);
    const today = startOfDay(new Date());

    switch (value) {
      case "today":
        setDate({ from: today, to: today });
        setIsOpen(false);
        break;
      case "last_month":
        const monthAgo = subDays(today, 29);
        setDate({ from: monthAgo, to: today });
        setIsOpen(false);
        break;
      case "last_year":
        const yearAgo = subYears(today, 1);
        setDate({ from: yearAgo, to: today });
        setIsOpen(false);
        break;
      case "custom":
        break;
    }
  };

  return (
    <div className="flex flex-col gap-6 h-full w-full">
      <div className="max-w-md">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              className={cn(
                "w-full justify-start text-left font-normal bg-white text-black hover:bg-gray-200 h-full",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formatDateRange()}
              <ChevronDown className="h-4 w-4 ml-2" />

            </Button>
          </PopoverTrigger>
          <PopoverContent className="md:w-auto w-full p-0 bg-white md:mr-20 text-black border-none shadow-xl" align="start">
            <div className="flex ">
              <div className="border-r p-3 space-y-1 flex flex-col">
                <Button
                  variant={preset === "today" ? "secondary" : "ghost"}
                  className="justify-start font-normal w-20"
                  onClick={() => handlePresetChange("today")}
                >
                  Today
                </Button>
                <Button
                  variant={preset === "last_month" ? "secondary" : "ghost"}
                  className="justify-start font-normal"
                  onClick={() => handlePresetChange("last_month")}
                >
                  Last month
                </Button>
                <Button
                  variant={preset === "last_year" ? "secondary" : "ghost"}
                  className="justify-start font-normal"
                  onClick={() => handlePresetChange("last_year")}
                >
                  Last year
                </Button>
                <Button
                  variant={preset === "custom" ? "secondary" : "ghost"}
                  className="justify-between font-normal"
                  onClick={() => {
                    setPreset("custom");
                  }}
                >
                  Custom range
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="p-3">
                <Calendar
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={(newDate) => {
                    setDate(newDate);
                    if (newDate?.from && newDate?.to) {
                      setPreset("custom");
                    }
                  }}
                  numberOfMonths={2}
                  className="rounded-md"
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
