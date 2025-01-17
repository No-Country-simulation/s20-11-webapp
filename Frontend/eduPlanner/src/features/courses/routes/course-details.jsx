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
  CalendarPlus,
  Clock,
  Coffee,
  Pencil,
  Sun,
  Timer,
  Users,
} from "lucide-react";
import { Link, useLoaderData } from "react-router-dom";
import { courseService } from "../services/course.service.js";
import { formatClassDays } from "../utils/weekdays.js";
export async function courseDetailsLoader({ params }) {
  const courseId = params.courseId;
  const courseDetails = await courseService.getCourseDetails(courseId);

  return { courseDetails };
}

const courseManagementLinks = [
  {
    title: "Administrar Estudiantes",
    Icon: Users,
    link: "students",
  },
  {
    title: "Administrar Horario",
    Icon: Calendar,
    link: "schedule",
  },
  {
    title: "Administrar Materias",
    Icon: BookMarked,
    link: "subjects",
  },
  {
    title: "Publicar Eventos",
    Icon: CalendarPlus,
    link: "events",
  },
];

export default function CourseDetails() {
  const { courseDetails } = useLoaderData();
  return (
    <div>
      <TitleBar title={courseDetails.name} />

      <Spacer size="3xs" />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <CourseDetailsCard courseDetails={courseDetails} />
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
      </div>
    </div>
  );
}

function LinkCard({ title, Icon, link }) {
  return (
    <Link
      to={link}
      viewTransition
      prefetch="intent"
      className="bg-gradient-to-r from-background to-secondary/10 via-secondary/30 w-full lg:max-w-lg transition-all duration-200 text-lg justify-between flex items-center gap-2 p-4 border rounded shadow hover:bg-gradient-to-t  hover:ring-2 hover:ring-primary/20"
    >
      <div className="">{title}</div>
      <div className="bg-primary p-2 rounded border text-background shadow">
        <Icon className="text-background" />
      </div>
    </Link>
  );
}

function CourseDetailsCard({ courseDetails }) {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Detalles del curso</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <DetailsCard
          label="Nombre del curso"
          value={courseDetails.name}
          Icon={Book}
        />
        <DetailsCard
          label="Comienzo de clases"
          value={courseDetails.classStartTime}
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
      <CardFooter className="flex justify-end">
        <Button variant="secondary" className="">
          <Pencil /> Editar detalles
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
        <div className="flex gap-2 items-center bg-muted/50 p-1">
          <Icon className="w-4 h-4 text-muted-foreground" />
          <div className="text-sm text-foreground ">{label}: </div>
        </div>

        <div className="text-sm text-foreground font-semibold text-center p-1">
          {value}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 border-b  p-2 ">
      <Icon className="w-4 h-4 text-muted-foreground" />
      <div className="flex items-center justify-between w-full">
        <div className="text-sm text-foreground">{label}: </div>
        <div className="text-sm text-foreground font-semibold">{value}</div>
      </div>
    </div>
  );
}
