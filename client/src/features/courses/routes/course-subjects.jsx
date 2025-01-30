import { Spacer } from "@/components/layout/spacer";
import { TitleBar } from "@/components/title-bar.jsx";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2Icon } from "lucide-react";
import { useLoaderData } from "react-router-dom";
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
  console.log(subject.color.light);
  return (
    <Card
      style={{
        "--subject-color-dark": subject.color.dark,
        "--subject-color-light": subject.color.light,
      }}
      className="select-none !rounded-md [&]:bg-[var(--subject-color-light)] dark:bg-[var(--subject-color-dark)] text-black dark:text-white transition-colors duration-300 hover:bg-[var(--subject-color-dark)] dark:hover:bg-[var(--subject-color-light)] hover:text-white dark:hover:text-black"
    >
      <CardHeader className="!p-6 !px-8 flex !flex-row gap-4 items-center">
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
