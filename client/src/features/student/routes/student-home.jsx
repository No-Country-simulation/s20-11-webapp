import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { format, parse } from "date-fns";
import { es } from "date-fns/locale";
import {
  Bell,
  Calendar,
  Calendar1,
  CalendarDays,
  Clock,
  Mail,
  RefreshCw,
  User2,
  Utensils,
} from "lucide-react";
import { Link, useLoaderData, useRevalidator } from "react-router-dom";
import { Spacer } from "../../../components/layout/spacer";
import { requireStudent } from "../../auth/services/auth.service";
import { EventsContainer } from "../../courses/components/events-container";
import { courseService } from "../../courses/services/course.service";
import { notificationsService } from "../../courses/services/notifications.service";
import { subjectService } from "../../courses/services/subject.service";
import { formatClassDaysToArray } from "../../courses/utils/weekdays";
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

  return {
    events: events.data,
    subjects: subjects.data,
    user: user.data,
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
      <section className="grid lg:grid-cols-5 gap-y-6 sm:gap-6">
        <div className="col-span-3 ">
          <div>
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
          <div className="col-span-5 lg:col-span-3">
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
        </div>
        <div className="col-span-5 lg:col-span-2 flex flex-col-reverse sm:flex-col gap-4 sm:gap-8  mx-auto ">
          <CurrentCourseCard course={course} user={user} />
          <OptionsButtonCard
            to="calendar"
            icon={<Calendar1 size={48} />}
            label="Calendario"
          />
          <OptionsButtonCard
            to={`/courses/${course.id}/schedule`}
            icon={<CalendarDays size={48} />}
            label="Horario"
          />
        </div>
      </section>
    </>
  );
}

function CurrentCourseCard({ course, user }) {
  // Formateamos la fecha: "dd MMM, yyyy" devolverá "31 ene, 2025"
  let formattedCreatedAt = format(user.auditInfo.createdAt, "dd MMM, yyyy", {
    locale: es,
  });

  const parsedStartTime = parse(course.classStartTime, "HH:mm:ss", new Date());

  let formattedStartTime = format(parsedStartTime, "h:mm a", { locale: es });

  formattedStartTime = formattedStartTime
    .replace("a. m.", "am")
    .replace("p. m.", "pm");

  const classDays = formatClassDaysToArray(course.classDays);

  return (
    <Card className="sm:w-[30rem] !bg-gradient-to-br from-primary/5 via-card to-primary/10">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-bold">{course.name}</CardTitle>
            <p className="text-xs text-muted-foreground mt-1 italic">
              Eres integrante desde el {formattedCreatedAt}
            </p>
          </div>
          <Badge variant="secondary" className="text-xs">
            {course.totalStudents}{" "}
            {course.totalStudents === 1 ? "integrante" : "integrantes"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            <span className="text-sm">
              Clases desde las {formattedStartTime}
            </span>
          </div>
          <div className="flex items-center">
            <Utensils className="w-4 h-4 mr-2" />
            <span className="text-sm">
              {course.lunchDurationInMinutes} min. almuerzo
            </span>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2 flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            Días de clase
          </h3>
          <div className="flex flex-wrap gap-2">
            {classDays.map((day, index) => (
              <Badge key={index} variant="outline">
                {day}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Agenda Diaria</h3>
          <ul className="space-y-1 text-sm">
            <li>
              {course.blocksBeforeLunch} bloques antes de almuerzo (
              {course.blockDurationInMinutes} min c/u)
            </li>
            <li>{course.blocksAfterLunch} bloques después de almuerzo</li>
            <li>{course.breakDurationInMinutes} min de receso entre bloques</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="!w-full">
        <a href={`mailto:${course.auditInfo.createdBy}`} className="!w-full">
          <Button variant="secondary" className="!w-full">
            <Mail /> Contactar coordinador
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
}

function EmptyEventsPanel() {
  return (
    <div className="bg-secondary/20 border-dashed border-2 border-border/20 rounded shadow p-4 h-[calc(100dvh-25rem)] grid place-content-center text-center">
      <div className="text-muted-foreground flex items-center gap-2 flex-col justify-center">
        <Bell size={30} />
        ¡Aún no hay eventos publicados para este curso!
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
