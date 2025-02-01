import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { differenceInHours, format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { BellPlus } from "lucide-react";

const IS_NEW_LIMIT_IN_HOURS = 1;

export function EventCard({
  header,
  title,
  message,
  color,
  scheduledFor,
  createdAt,
  expired,
}) {
  const formattedScheduledForTime =
    format(new Date(scheduledFor), "HH:mm") + " hrs";

  const formattedScheduledForDate = format(
    new Date(scheduledFor),
    "EEE d MMM",
    { locale: es }
  );

  const createdDate = parseISO(createdAt);
  const isNew =
    differenceInHours(new Date(), createdDate) < IS_NEW_LIMIT_IN_HOURS;

  return (
    <div
      className={cn(
        "relative duration-200 border bg-card  pl- rounded-lg shadow flex items-center gap-3 justify-between overflow-hidden transition-all hover:shadow-md group",
        expired && "opacity-65"
      )}
    >
      {isNew && <IsNewBadge />}
      <div className="flex w-full gap-4">
        <div
          style={{
            "--border-color-light": color.light,
            "--border-color-dark": color.dark,
          }}
          className={cn(
            `w-2 bg-[--border-color-light] dark:bg-[--border-color-dark] group-hover:bg-[--border-color-dark] dark:group-hover:bg-[--border-color-light] transition-colors `,
            expired && "!bg-muted"
          )}
        />
        <div className="flex p-4 justify-between flex-1 gap-4 items-center">
          <div>
            <div className="text-sm text-muted-foreground mb-1">
              {header ?? "Notificación"}
            </div>
            <div className="text-md font-semibold">{title}</div>
            <div className="text-sm text-muted-foreground">{message}</div>
          </div>
          <div className="text-nowrap text-sm text-center">
            <div className="font-semibold">{formattedScheduledForTime}</div>
            <div className="text-muted-foreground text-xs capitalize">
              {formattedScheduledForDate}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IsNewBadge() {
  return (
    <Tooltip>
      <TooltipTrigger className="absolute top-1 right-1 ">
        <Badge variant="ghost" className="w-6 flex items-center justify-center">
          <BellPlus className="shrink-0" size={14} />
        </Badge>
      </TooltipTrigger>
      <TooltipContent>
        <p className="text-xs">{`¡Notificación reciente!`}</p>
      </TooltipContent>
    </Tooltip>
  );
}
