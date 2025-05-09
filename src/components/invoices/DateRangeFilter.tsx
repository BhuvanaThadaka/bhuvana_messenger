
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";

interface DateRangeFilterProps {
  date: DateRange | undefined;
  onDateChange: (date: DateRange | undefined) => void;
}

export const DateRangeFilter = ({ date, onDateChange }: DateRangeFilterProps) => {
  return (
    <DatePickerWithRange 
      date={date} 
      onDateChange={onDateChange} 
    />
  );
};
