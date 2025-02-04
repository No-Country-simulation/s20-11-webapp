import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Fragment } from "react";
import { Spacer } from "../../../components/layout/spacer";
import { EventCard } from "../components/event-card";

export function EventsContainer({ events, className }) {
  return (
    <ScrollArea className={cn(" h-[calc(100dvh-17rem)] pr-3 ", className)}>
      <Spacer size="5xs" />
      {events.map((event) => (
        <Fragment key={event.id}>
          <EventCard key={event.id} {...event} />
          <Spacer size="5xs" />
        </Fragment>
      ))}
    </ScrollArea>
  );
}
