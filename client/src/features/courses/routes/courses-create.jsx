import { Field } from "@/components/forms";
import { StatusButton } from "@/components/ui/status-button";
import { useIsPending } from "@/hooks/use-pending.jsx";
import { createValidationHandler } from "@/lib/validation-handler";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { data, Form, redirect, useActionData } from "react-router-dom";
import { requireAdmin } from "../../auth/services/auth.service";
import { CreateCourseSchema } from "../schemas/course.schemas";
import { courseService } from "../services/course.service";
import { COURSE_ERROR_MESSAGES } from "../utils/course.errors";

export async function createCourseAction({ request }) {
  await requireAdmin();

  const formData = await request.formData();
  const submission = await parseWithZod(formData, {
    async: true,
    schema: CreateCourseSchema.transform(validateAndCreateCourse),
  });

  if (submission.status !== "success") {
    return data(
      { result: submission.reply() },
      { status: submission.status !== "error" ? 400 : 200 }
    );
  }
  const { createdCourse } = submission.value;

  return redirect(`/courses/${createdCourse.id}`);
}
export async function createCourseLoader() {
  await requireAdmin();
  return null;
}

export default function CreateCourseRoute() {
  const actionData = useActionData();
  const isPending = useIsPending();

  const [form, fields] = useForm({
    id: "create-course-form",
    constraint: getZodConstraint(CreateCourseSchema),
    defaultValue: {},
    lastResult: actionData?.result,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: CreateCourseSchema });
    },
    shouldRevalidate: "onBlur",
  });
  return (
    <Form {...getFormProps(form)} method="POST" className="flex flex-col gap-2">
      <Field
        labelProps={{ children: "Nombre del curso" }}
        inputProps={{
          ...getInputProps(fields.courseName, { type: "text" }),
          placeholder: "Ej: Tercero B",
          autoFocus: true,
        }}
        errors={fields.courseName.errors}
      />

      <StatusButton
        className=""
        form={form.id}
        status={isPending ? "pending" : form.status ?? "idle"}
        type="submit"
        disabled={isPending}
      >
        Crear curso
      </StatusButton>
    </Form>
  );
}
const validateAndCreateCourse = createValidationHandler({
  serviceCall: (data) =>
    courseService.createCourse({
      courseName: data.courseName,
    }),
  errorMessages: COURSE_ERROR_MESSAGES,
  responseKey: "createdCourse",
});
