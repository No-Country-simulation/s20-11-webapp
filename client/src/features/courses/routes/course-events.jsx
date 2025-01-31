import { TitleBar } from "@/components/title-bar.jsx";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Bell, Eye, EyeClosed, Plus } from "lucide-react";
import { Fragment, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Spacer } from "../../../components/layout/spacer";
import { requireAdmin } from "../../auth/services/auth.service";
import { CreateEvent } from "../components/create-event";
import { notificationsService } from "../services/notifications.service";
import { subjectService } from "../services/subject.service";

export async function courseEventsLoader({ params }) {
  await requireAdmin();

  const [events, subjects] = await Promise.all([
    notificationsService.getCourseEvents(params.courseId),
    subjectService.getSubjects(params.courseId),
  ]);

  return { events: events.data, subjects: subjects.data };
}

export default function CourseEvents() {
  const { events, subjects } = useLoaderData();

  //filter expired. Button to show expired.

  const activeEvents = events.filter((event) => !event.expired);

  const [showAll, setShowAll] = useState(false);

  const eventsToShow = showAll ? events : activeEvents;

  return (
    <>
      <TitleBar title="Eventos" />
      <Spacer size="3xs" />
      <div className="grid lg:grid-cols-5 gap-8">
        <div className="col-span-3 ">
          <div className="flex flex-col sm:flex-row justify-between items-center mr-3 gap-2">
            <h1 className="text-2xl">
              {showAll ? "Todos los" : "Próximos"} eventos (
              {eventsToShow.length})
            </h1>
            {events.length > 0 && (
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowAll((current) => !current)}
                  variant="secondary"
                >
                  {showAll ? <EyeClosed /> : <Eye />}
                  {showAll ? "Ocultar Expirados" : "Incluir Expirados"}
                </Button>
                <CreateEvent subjects={subjects} />
              </div>
            )}
          </div>
          <Spacer size="3xs" />
          {events.length <= 0 ? (
            <EmptyEventsPanel />
          ) : (
            <ScrollArea className=" h-[calc(100dvh-17rem)] pr-3 ">
              <Spacer size="5xs" />
              {eventsToShow.map((event) => (
                <Fragment key={event.id}>
                  <EventCard key={event.id} {...event} />
                  <Spacer size="5xs" />
                </Fragment>
              ))}
            </ScrollArea>
          )}
        </div>
      </div>
    </>
  );
}

function EmptyEventsPanel() {
  return (
    <div className="bg-secondary/20 border-dashed border-2 border-border/20 rounded shadow p-4 h-[calc(100dvh-25rem)] grid place-content-center text-center">
      <div className="text-muted-foreground flex items-center gap-2 flex-col justify-center">
        <Bell size={30} />
        Aún no hay eventos publicados para este curso.
        <AddEvent />
      </div>
    </div>
  );
}

function AddEvent() {
  return (
    <Button>
      <Plus /> Agregar evento
    </Button>
  );
}

function EventCard({
  header,
  title,
  message,
  color,
  scheduledFor,
  createdAt,
  expired,
}) {
  const formattedScheduledFor =
    format(new Date(scheduledFor), "HH:mm") + " hrs";

  return (
    <div
      style={{
        "--border-color-light": color.light,
        "--border-color-dark": color.dark,
      }}
      className={cn(
        "border bg-secondary/70 dark:bg-secondary/20 border-l-8 border-l-[var(--border-color-light)] dark:border-l-[var(--border-color-dark)]  p-3 rounded shadow flex items-center gap-3 justify-between hover:ring-2 ring-[var(--border-color-light)] dark:ring-[var(--border-color-dark)] cursor-pointer",
        expired && "opacity-65"
      )}
    >
      <div>
        <div className="text-sm text-muted-foreground">
          {header ?? "No header"}
        </div>
        <div className="text-lg">{title}</div>
        <div className="text-sm text-muted-foreground">{message}</div>
      </div>
      <div>{formattedScheduledFor}</div>
    </div>
  );
}
