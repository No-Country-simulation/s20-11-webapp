import { TitleBar } from "@/components/title-bar.jsx";
import { Button } from "@/components/ui/button";
import { Bell, Eye, EyeClosed, Plus } from "lucide-react";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Spacer } from "../../../components/layout/spacer";
import { requireAdmin } from "../../auth/services/auth.service";
import { createEvent, CreateEvent } from "../components/create-event";
import { EventsContainer } from "../components/events-container";
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

export async function courseEventsAction({ request }) {
  await requireAdmin();

  const formData = await request.formData();

  const intent = formData.get("intent");

  switch (intent) {
    case "create-event": {
      return await createEvent(formData);
    }
  }
}

export default function CourseEvents() {
  const { events, subjects } = useLoaderData();

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
            <EmptyEventsPanel subjects={subjects} />
          ) : (
            <EventsContainer events={eventsToShow} />
          )}
        </div>
      </div>
    </>
  );
}

function EmptyEventsPanel({subjects}) {
  return (
    <div className="bg-secondary/20 border-dashed border-2 border-border/20 rounded shadow p-4 h-[calc(100dvh-25rem)] grid place-content-center text-center">
      <div className="text-muted-foreground flex items-center gap-2 flex-col justify-center">
        <Bell size={30} />
        Aún no hay eventos publicados para este curso.
        <CreateEvent subjects={subjects} />
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
