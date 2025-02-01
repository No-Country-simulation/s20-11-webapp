import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Bell, Calendar1, CalendarDays, RefreshCw, User2 } from "lucide-react";
import { Link, useLoaderData, useRevalidator } from "react-router-dom";
import { Spacer } from "../../../components/layout/spacer";
import { requireStudent } from "../../auth/services/auth.service";
import { EventsContainer } from "../../courses/components/events-container";
import { courseService } from "../../courses/services/course.service";
import { notificationsService } from "../../courses/services/notifications.service";
import { subjectService } from "../../courses/services/subject.service";
import { profileService } from "../../profile/services/profile.service";

export async function studentHomeLoader({ params }) {
  await requireStudent();

  const currentStudentCourse = await courseService.getCurrentStudentCourse();

  const courseId = currentStudentCourse.data.id;

  const [events, subjects, user] = await Promise.all([
    notificationsService.getCourseEvents(courseId),
    subjectService.getSubjects(courseId),
    profileService.getProfileInfo(),
  ]);

  // console.log(JSON.stringify(events.data,null,2))

  return {
    events: events.data,
    subjects: subjects.data,
    user,
    course: currentStudentCourse.data,
  };
}

export async function studentHomeAction() {
  await requireStudent();
  return null;
}

export default function StudentHome() {
  const { events, subjects, user, course } = useLoaderData();

  const activeEvents = events.filter((e) => !e.expired);

  const hasAnyNameDefined = user.firstName || user.lastName;

  const isProfileComplete = user.isProfileComplete;

  const greeting = hasAnyNameDefined
    ? `¡Hola, ${user.firstName} ${user.lastName}!`
    : "¡Hola!";

  return (
    <>
      <section className="grid sm:grid-cols-5 gap-6">
        <div className="col-span-3 ">
          {!isProfileComplete && <ProfileCompletionCard />}
          <h1 className="text-3xl">{greeting}</h1>
          <Spacer size="4xs" />
          <div className="flex justify-between items-center mr-5">
            <h1 className="text-xl">
              Notificaciones activas ({activeEvents.length})
            </h1>
            <RefreshButton />
          </div>
          <Spacer size="5xs" />
        </div>
      </section>
      <section className="grid sm:grid-cols-5 gap-12">
        <div className="col-span-5 sm:col-span-3">
          {activeEvents.length > 0 ? (
            <EventsContainer
              className={cn(
                "h-[calc(100dvh-22rem)]",
                isProfileComplete && "h-[calc(100dvh-14rem)]"
              )}
              events={activeEvents}
            />
          ) : (
            <EmptyEventsPanel />
          )}
        </div>
        <div className="col-span-5 sm:col-span-2 flex flex-col gap-4 sm:gap-8 mt-2  mx-auto ">
          <OptionsButtonCard
            to="#"
            icon={<Calendar1 size={48} />}
            label="Calendario"
          />
          <OptionsButtonCard
            to="#"
            icon={<CalendarDays size={48} />}
            label="Horario"
          />
        </div>
      </section>
    </>
  );
}

function EmptyEventsPanel() {
  return (
    <div className="bg-secondary/20 border-dashed border-2 border-border/20 rounded shadow p-4 h-[calc(100dvh-25rem)] grid place-content-center text-center">
      <div className="text-muted-foreground flex items-center gap-2 flex-col justify-center">
        <Bell size={30} />
        ¡Aún no hay eventos publicados para este curso.
      </div>
    </div>
  );
}

function OptionsButtonCard({ icon, label, to }) {
  return (
    <Link to={to} viewTransition prefetch="intent">
      <article className="bg-secondary dark:bg-secondary/30 flex items-center gap-4 border-border shadow border-2 p-6 text-primary rounded-lg text-xl px-16 cursor-pointer hover:bg-primary/10 transition-all hover:ring-2 ring-primary">
        <div>{icon}</div>
        <div>{label}</div>
      </article>
    </Link>
  );
}

function ProfileCompletionCard() {
  return (
    <Alert className="mb-8">
      <User2 className="w-4 h-4" />
      <AlertTitle>¡Completa tu perfil!</AlertTitle>
      <AlertDescription className="flex items-center justify-between gap-4">
        <div>
          <p className="mt-2 text-sm">
            Completa tu perfil para personalizar tu experiencia
          </p>
          <Progress value={33} className="h-2 mt-2 w-48" />
        </div>
        <Link viewTransition prefetch="intent" to={"/profile"}>
          <Button>Completar Perfil</Button>
        </Link>
      </AlertDescription>
    </Alert>
  );
}

function RefreshButton() {
  const revalidator = useRevalidator();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={() => revalidator.revalidate()}
          className="group"
          variant="outline"
          size="icon"
        >
          <RefreshCw className="group-hover:rotate-180 transition-all duration-700" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Actualizar notificaciones</p>
      </TooltipContent>
    </Tooltip>
  );
}
