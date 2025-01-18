import { Spacer } from "@/Components/layout/spacer";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Plus } from "lucide-react";
import { Link, useLoaderData } from "react-router-dom";
import { courseService } from "../services/course.service";

export async function coursesListLoader() {
  const courses = await courseService.getAllCourses();
  return { courses };
}

export default function CoursesList() {
  const { courses } = useLoaderData();
  return (
    <>
      <nav className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Administración de cursos</h1>
        <Button>
          <Plus /> Agregar curso
        </Button>
      </nav>
      <Spacer size="3xs" />

      <div className="flex flex-wrap gap-4">
        {courses.map((course) => (
          <CourseCard course={course} />
        ))}
      </div>
    </>
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
      <Card className="">
        <CardHeader>
          <CardTitle>{course.name} </CardTitle>
          <CardDescription>Descripción del curso</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
