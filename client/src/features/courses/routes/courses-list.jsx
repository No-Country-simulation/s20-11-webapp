import { Spacer } from "@/components/layout/spacer";
import { ResponsiveOutletModal } from "@/components/responsive-outlet-modal.jsx";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
  Book,
  Calendar,
  GraduationCap,
  Plus,
  PlusIcon,
  Search,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { courseService } from "../services/course.service";

export async function coursesListLoader() {
  const courses = await courseService.getAllCourses();

  return { courses };
}

export default function CoursesList() {
  const { courses } = useLoaderData();
  const isMobile = useIsMobile();

  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = useMemo(() => {
    return courses.filter((course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
    );
  }, [courses, searchQuery]);

  return (
    <>
      <Spacer size="3xs" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6">
        <StatsCard
          title={"Total Cursos"}
          value={courses.length}
          description={"Cursos bajo administración en el período actual"}
          Icon={<Book size={40} />}
        />

        <StatsCard
          title={"Estudiantes Activos"}
          value={144}
          description={"Totalidad de estudiantes de todos los cursos"}
          Icon={<Users size={40} />}
        />
        <StatsCard
          title={"Notificaciones"}
          value={14}
          description={"Eventos y avisos activos a través de tus cursos"}
          Icon={<Calendar size={40} />}
          className={"sm:col-span-2 lg:col-span-1"}
        />
      </div>
      <Spacer size="3xs" />
      <div className="flex-col sm:flex-row gap-2 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-center sm:text-left">
          Administración de cursos
        </h1>
        <nav className="flex gap-6 justify-between items-center ">
          <CoursesSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </nav>
      </div>
      <Spacer size="5xs" />
      <Separator />
      <Spacer size="3xs" />

      {courses.length ? (
        <div className="grid sm:grid-cols-2 gap-6 lg:grid-cols-3 2xl:grid-cols-4">
          {isMobile && <CreateCourseCard />}

          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
          {!isMobile && <CreateCourseCard />}
        </div>
      ) : (
        <EmptyCoursesPlaceholder />
      )}
    </>
  );
}
function CoursesSearch({ searchQuery, setSearchQuery }) {
  return (
    <div className="flex gap-1 justify-center items-center w-[25rem] ">
      <Input
        autoFocus
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Buscar cursos..."
        className="w-full"
      />
      <Button variant="secondary" size="icon">
        <Search />
      </Button>
    </div>
  );
}

function StatsCard({ title, value, description, Icon, className }) {
  return (
    <div
      className={cn(
        "  bg-card gap-2 shadow border rounded-lg p-4 sm:p-6 flex justify-between items-center group",
        className
      )}
    >
      <div>
        <div className="flex !flex-row items-center justify-between">
          <div>{title}</div>
        </div>
        <div className="text-3xl font-bold text-primary">{value}</div>
        <div className="text-sm text-muted-foreground">{description}</div>
      </div>
      <div className="text-primary group-hover:rotate-3 group-hover:scale-105 transition-all">
        {Icon}
      </div>
    </div>
  );
}
function EmptyCoursesPlaceholder() {
  return (
    <div className="bg-secondary/20 border-dashed border-2 border-border/20 rounded shadow p-4 h-[calc(100dvh-25rem)] grid place-content-center text-center">
      <div className="text-muted-foreground flex items-center gap-2 flex-col justify-center">
        <GraduationCap size={30} />
        Aún no has registrado cursos.
        <CreateCourse />
      </div>
    </div>
  );
}

function CourseCard({ course }) {
  return (
    <Link
      viewTransition
      prefetch="intent"
      className="hover:ring-2 hover:ring-primary rounded-xl transition-all duration-300"
      to={`/courses/${course.id}`}
    >
      <Card className="h-[6rem]  !bg-gradient-to-br from-primary/5 via-card to-primary/10">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            {course.name}{" "}
          </CardTitle>
          <CardDescription>
            <Users className="inline-flex mr-1" size={16} /> 3 estudiantes
            inscritos
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}

function CreateCourse() {
  return (
    <ResponsiveOutletModal
      to={`create`}
      trigger={
        <Button>
          <Plus /> Agregar curso
        </Button>
      }
      title={"Crear curso"}
      description={`Registra un nuevo curso en el sistema`}
    />
  );
}

function CreateCourseCard() {
  return (
    <ResponsiveOutletModal
      to={`create`}
      trigger={
        <Card className="h-[6rem] border-dashed border-[2px] border-border/20 bg-secondary/50 hover:bg-card transition-colors duration-300 hover:border-primary group">
          <CardHeader className="">
            <div className="flex justify-between gap-2">
              <CardTitle className="text-xl font-semibold text-muted-foreground">
                Nuevo Curso
              </CardTitle>
              <PlusIcon className="text-primary group-hover:scale-150 group-hover:translate-y-2 transition-all duration-300" />
            </div>
            <CardDescription>
              Haz click para agregar un nuevo curso
            </CardDescription>
          </CardHeader>
        </Card>
      }
      title={"Crear curso"}
      description={`Registra un nuevo curso en el sistema`}
    />
  );
}
