import { Spacer } from "@/components/layout/spacer";
import { TitleBar } from "@/components/title-bar.jsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BookMarked,
  Clock,
  GraduationCap,
  Plus,
  PlusIcon,
  Search,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { requireAdmin } from "../../auth/services/auth.service";
import { createSubject, CreateSubject } from "../components/create-subject";
import { courseService } from "../services/course.service";
import { subjectService } from "../services/subject.service";

export async function courseSubjectsLoader({ params }) {
  await requireAdmin();

  const [course, subjects] = await Promise.all([
    courseService.getCourseDetails(params.courseId),
    subjectService.getSubjects(params.courseId),
  ]);

  return {
    course,
    subjects: subjects.data,
  };
}

export async function courseSubjectsAction({ request, params }) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  switch (intent) {
    case "create-subject":
      return createSubject(formData, params.courseId);
    default:
      return null;
  }
}

export default function CourseSubjects() {
  const { course, subjects } = useLoaderData();

  const [searchQuery, setSearchQuery] = useState("");
  const filteredSubjects = useMemo(() => {
    return subjects.filter((subject) =>
      subject.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
    );
  }, [subjects, searchQuery]);

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <TitleBar title={`${course.name} - Materias`} />
        {subjects.length > 0 && (
          <SubjectsSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}
      </div>
      <Spacer size="2xs" />

      {subjects.length ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSubjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
          <CreateSubjectCard />
        </div>
      ) : (
        <EmptySubjectsPlaceholder />
      )}
    </>
  );
}

function CreateSubjectCard() {
  const InnerCard = (
    <article className="p-4 py-6 border-2 hover:border-primary border-dashed bg-secondary/60 shadow rounded-xl transition-all hover:ring-2 hover:ring-[--sc-light] dark:hover:ring-[--sc-dark] cursor-pointer group">
      <div className="flex gap-2 items-center justify-between">
        <div className="text-xl font-bold">Nueva Materia</div>
        <PlusIcon className="text-primary group-hover:scale-150 group-hover:translate-y-3 transition-all duration-300" />
      </div>
      <Spacer size="4xs" />
      <div className="flex justify-between gap-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="leading-tight">
            Haz click para crear una nueva materia
          </span>
        </div>
      </div>
    </article>
  );

  return <CreateSubject trigger={<div>{InnerCard}</div>} />;
}

function SubjectsSearch({ searchQuery, setSearchQuery }) {
  return (
    <div className="flex gap-1 justify-center items-center w-full sm:w-[20rem] ">
      <Input
        autoFocus
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Buscar materias..."
        className="w-full"
      />
      <Button variant="secondary" size="icon">
        <Search />
      </Button>
    </div>
  );
}

function SubjectCard({ subject }) {
  const secondsToHours = (seconds) => {
    if (seconds === 0) return "0 hrs";
    const hours = seconds / 3600;
    return `${hours.toFixed(1)}h`;
  };

  return (
    <article
      style={{
        "--sc-dark": subject.color.dark,
        "--sc-light": subject.color.light,
      }}
      className="p-4 py-6 border shadow rounded-xl transition-all hover:ring-2 hover:ring-[--sc-light] dark:hover:ring-[--sc-dark] cursor-pointer"
    >
      <div className="flex gap-2 items-center">
        <div
          style={{
            "--sc-dark": subject.color.dark,
            "--sc-light": subject.color.light,
          }}
          className="border border-[--sc-dark] dark:border-[--sc-light] size-5 bg-[--sc-light] dark:bg-[--sc-dark] rounded-full"
        ></div>
        <div className="text-xl font-bold">{subject.name}</div>
      </div>
      <Spacer size="4xs" />
      <div className="flex justify-between gap-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <GraduationCap size={20} />
          <span className="leading-tight">
            {subject.teacherName ?? "Sin profesor asignado"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={20} />
          <span className="leading-tight">
            {secondsToHours(subject.assignedTimeInSeconds)} semanales
          </span>
        </div>
      </div>
    </article>
  );
}
function EmptySubjectsPlaceholder() {
  return (
    <div className="bg-secondary/20 border-dashed border-2 border-border/20 rounded shadow p-4 h-[calc(100dvh-20rem)] grid place-content-center text-center">
      <div className="text-muted-foreground flex items-center gap-2 flex-col justify-center">
        <BookMarked size={30} />
        Aún no has ingresado materias.
        <CreateSubject
          trigger={
            <Button>
              <Plus /> Agregar materia
            </Button>
          }
        />
      </div>
    </div>
  );
}
