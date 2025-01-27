import { Spacer } from "@/Components/layout/spacer";
import { TitleBar } from "@/Components/title-bar.jsx";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile.jsx";
import {
  Book,
  BookMarked,
  Calendar,
  CalendarDays,
  CalendarPlus,
  ChevronRight,
  Clock,
  Coffee,
  Settings,
  Sun,
  Timer,
  Users,
} from "lucide-react";
import { Link, useLoaderData } from "react-router-dom";
import { courseService } from "../services/course.service.js";
import { formatTime } from "../utils/time.js";
import { formatClassDays } from "../utils/weekdays.js";
export async function courseDetailsLoader({ params }) {
  const courseId = params.courseId;
  const courseDetails = await courseService.getCourseDetails(courseId);

  return { courseDetails };
}

const courseManagementLinks = [
  {
    title: "Estudiantes",
    Icon: Users,
    link: "students",
  },
  {
    title: "Horario",
    Icon: CalendarDays,
    link: "schedule",
  },
  {
    title: "Eventos",
    Icon: CalendarPlus,
    link: "events",
  },
  {
    title: "Materias",
    Icon: BookMarked,
    link: "subjects",
  },
];

export default function CourseDetails() {
  const { courseDetails } = useLoaderData();
  return (
    <>
      <TitleBar title={`${courseDetails.name} - Administración`} />
      <Spacer size="3xs" />
      <div className="flex flex-col lg:flex-row gap-8 xl:gap-36 ">
        <div className="flex flex-col gap-4 col-span-2">
          {courseManagementLinks.map((link) => (
            <LinkCard
              key={link.link}
              title={link.title}
              Icon={link.Icon}
              link={link.link}
            />
          ))}
        </div>
        <CourseDetailsCard courseDetails={courseDetails} />
      </div>
    </>
  );
}

function LinkCard({ title, Icon, link }) {
  return (
    <Link
      to={link}
      viewTransition
      prefetch="intent"
      className="bg-gradient-to-r from-card/50 to-secondary/10 via-secondary/30 w-full lg:w-[32rem] transition-all duration-200 text-lg justify-between flex items-center gap-2 p-4 border rounded shadow hover:bg-gradient-to-l  hover:ring-2 hover:ring-primary/20 group"
    >
      <div className="flex items-center gap-6">
        <Icon className="text-primary" />
        {title}
      </div>
      <ChevronRight className="group-hover:text-primary group-hover:brightness-125 group-hover:translate-x-1 transition-all duration-200" />
    </Link>
  );
}

function CourseDetailsCard({ courseDetails }) {
  return (
    <Card className="col-span-2 grow">
      <CardHeader>
        <CardTitle>Detalles del curso</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 sm:gap-2">
        <DetailsCard
          label="Nombre del curso"
          value={courseDetails.name}
          Icon={Book}
        />
        <DetailsCard
          label="Comienzo de clases"
          value={formatTime(courseDetails.classStartTime)}
          Icon={Clock}
        />
        <DetailsCard
          label="Bloques matutinos"
          value={courseDetails.blocksBeforeLunch}
          Icon={Sun}
        />
        <DetailsCard
          label="Bloques tarde"
          value={courseDetails.blocksAfterLunch}
          Icon={Coffee}
        />
        <DetailsCard
          label="Total de bloques por dia"
          value={courseDetails.totalBlocksPerDay}
          Icon={Calendar}
        />
        <DetailsCard
          label="Dias de clases"
          value={formatClassDays(courseDetails.classDays)}
          Icon={Calendar}
        />
        <DetailsCard
          label="Duración de bloque"
          value={`${courseDetails.blockDurationInMinutes} minutos`}
          Icon={Timer}
        />
        <DetailsCard
          label="Duración receso"
          value={`${courseDetails.breakDurationInMinutes} minutos`}
          Icon={Timer}
        />
        <DetailsCard
          label="Duración almuerzo"
          value={`${courseDetails.lunchDurationInMinutes} minutos`}
          Icon={Timer}
        />
      </CardContent>
      <CardFooter className="flex justify-end w-full">
        <Button variant="outline" className="w-full sm:w-auto">
          <Settings /> Configurar curso
        </Button>
      </CardFooter>
    </Card>
  );
}

function DetailsCard({ label, value, Icon }) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="flex flex-col  gap-1 border rounded text-balance  p-0 ">
        <div className="flex gap-2 items-center bg-primary/10 p-1">
          <Icon className="w-4 h-4 text-muted-foreground" />
          <div className="text-sm text-foreground ">{label}: </div>
        </div>

        <div className="text-sm text-foreground font-semibold text-right p-1">
          {value}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 border-b  p-2 ">
      <Icon className="w-4 h-4 text-primary/80" />
      <div className="flex items-center justify-between w-full">
        <div className="text-sm text-foreground">{label}: </div>
        <div className="text-sm text-foreground font-semibold text-nowrap">
          {value}
        </div>
      </div>
    </div>
  );
}
