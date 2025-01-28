import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2Icon } from "lucide-react";
import { useLoaderData } from "react-router-dom";
import { Spacer } from "@/components/layout/spacer.js";
import { TitleBar } from "@/components/title-bar.jsx";
import { requireAdmin } from "../../auth/services/auth.service";
import {
  CREATE_SUBJECT_INTENT,
  createSubject,
  CreateSubject,
} from "../components/create-subject";
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
    case CREATE_SUBJECT_INTENT:
      return createSubject(formData, params.courseId);
    default:
      return null;
  }
}

export default function CourseSubjects() {
  const { course, subjects } = useLoaderData();

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-2 justify-between items-start">
        <TitleBar title={`${course.name} - Materias`} />
        <CreateSubject />
      </div>
      <Spacer size="2xs" />
      <div className="flex gap-4 flex-wrap">
        {subjects.map((subject) => (
          <SubjectCard key={subject.id} subject={subject} />
        ))}
      </div>
    </>
  );
}

function SubjectCard({ subject }) {
  return (
    <Card
      style={{
        borderLeftWidth: "6px",
        borderLeftColor: subject.color,
        "--subject-color": subject.color,
      }}
      className="select-none !rounded-md hover:bg-[var(--subject-color)]  transition-colors duration-300"
    >
      <CardHeader className="!p-4 flex !flex-row gap-4 items-center">
        <CardTitle className="text-nowrap">{subject.name}</CardTitle>
      </CardHeader>
    </Card>
  );
}

function RemoveSubject({ subjectId }) {
  return (
    <Button variant="ghost" size="icon">
      <Trash2Icon className="w-4 h-4" />
    </Button>
  );
}

function EditSubject() {
  return null;
}
