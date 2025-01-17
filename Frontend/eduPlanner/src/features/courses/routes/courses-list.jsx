import { Spacer } from "@/Components/layout/spacer";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const coursesList = [
  {
    id: 1,
    name: "1ro A",
  },
  {
    id: 2,
    name: "1ro B",
  },
  {
    id: 3,
    name: "1ro C",
  },
  {
    id: 4,
    name: "2do A",
  },
  {
    id: 5,
    name: "2do B",
  },
  {
    id: 6,
    name: "2do C",
  },
  {
    id: 7,
    name: "3ro A",
  },
  {
    id: 8,
    name: "3ro B",
  },
  {
    id: 9,
    name: "3ro C",
  },
];

export default function CoursesList() {
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
        {coursesList.map((course) => (
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
