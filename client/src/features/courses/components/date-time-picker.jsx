import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useInputControl } from "@conform-to/react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export function DateTimePicker({ form, fields }) {
  const scheduledForField = useInputControl(fields.scheduledFor);
  const dateValue = scheduledForField.value
    ? new Date(scheduledForField.value)
    : null;

  const handleDateSelect = (selectedDate) => {
    if (selectedDate) {
      let newDate = selectedDate;
      if (scheduledForField.value) {
        const currentDate = new Date(scheduledForField.value);
        newDate = new Date(selectedDate);
        newDate.setHours(currentDate.getHours());
        newDate.setMinutes(currentDate.getMinutes());
      }
      scheduledForField.change(newDate.toISOString());
    }
  };

  const handleHourChange = (hour) => {
    const newDate = dateValue ? new Date(dateValue) : new Date();
    newDate.setHours(parseInt(hour, 10));
    scheduledForField.change(newDate.toISOString());
  };

  const handleMinuteChange = (minute) => {
    const newDate = dateValue ? new Date(dateValue) : new Date();
    newDate.setMinutes(parseInt(minute, 10));
    scheduledForField.change(newDate.toISOString());
  };

  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full !justify-start !text-left font-normal",
            dateValue && "font-semibold"
          )}
        >
          {dateValue ? (
            format(dateValue, "PPP HH:mm", { locale: es })
          ) : (
            <span>Seleccione fecha y hora</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={dateValue}
          onSelect={handleDateSelect}
          locale={es}
          initialFocus
        />
        <div className="flex items-center justify-center p-3 border-t">
          <Select
            value={
              dateValue ? dateValue.getHours().toString().padStart(2, "0") : ""
            }
            onValueChange={handleHourChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Hora" />
            </SelectTrigger>
            <SelectContent>
              {hours.map((hour) => (
                <SelectItem key={hour} value={hour}>
                  {hour}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="mx-2">:</span>
          <Select
            value={
              dateValue
                ? dateValue.getMinutes().toString().padStart(2, "0")
                : ""
            }
            onValueChange={handleMinuteChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Minuto" />
            </SelectTrigger>
            <SelectContent>
              {minutes.map((minute) => (
                <SelectItem key={minute} value={minute}>
                  {minute}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </PopoverContent>
    </Popover>
  );
}
