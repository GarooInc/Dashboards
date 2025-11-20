import React, { createContext, useContext, useState } from "react";
import { format, subDays } from "date-fns";
import type { DateRange } from "react-day-picker";

type DatePreset = "today" | "last_month" | "last_year" | "custom";

interface DateFilterContextType {
  date: DateRange | undefined;
  preset: DatePreset;
  setDate: (date: DateRange | undefined) => void;
  setPreset: (preset: DatePreset) => void;
  getQueryParams: () => string;
  formatDateRange: () => string;
}

const DateFilterContext = createContext<DateFilterContextType | undefined>(undefined);

export function DateFilterProvider({ children }: { children: React.ReactNode }) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 29),
    to: new Date(),
  });
  const [preset, setPreset] = useState<DatePreset>("last_month");

  const getQueryParams = () => {
    if (preset === "today") return "?today=true";
    if (preset === "last_month") return "?last_month=true";
    if (preset === "last_year") return "?last_year=true";
    
    if (date?.from && date?.to) {
      return `?start_date=${format(date.from, "yyyy-MM-dd")}&end_date=${format(date.to, "yyyy-MM-dd")}`;
    }
    return "";
  };

  const formatDateRange = () => {
    if (!date?.from) return "Select date range";
    
    if (preset === "today") return "Today";
    if (preset === "last_month") return "Last Month";
    if (preset === "last_year") return "Last year";
    
    if (date.to) {
      return `${format(date.from, "MMM d, yyyy")} - ${format(date.to, "MMM d, yyyy")}`;
    }
    return format(date.from, "MMM d, yyyy");
  };

  return (
    <DateFilterContext.Provider
      value={{
        date,
        preset,
        setDate,
        setPreset,
        getQueryParams,
        formatDateRange,
      }}
    >
      {children}
    </DateFilterContext.Provider>
  );
}

export function useDateFilter() {
  const context = useContext(DateFilterContext);
  if (context === undefined) {
    throw new Error("useDateFilter must be used within a DateFilterProvider");
  }
  return context;
}