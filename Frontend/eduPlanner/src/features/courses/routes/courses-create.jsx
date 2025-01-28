import { Field } from "@/Components/forms";
import { StatusButton } from "@/Components/ui/status-button";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { data, Form, redirect, useActionData } from "react-router-dom";
import { z } from "zod";
import { useIsPending } from "../../../hooks/use-pending";
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

  console.log("Submission status:", submission.status);
  console.log("Submission reply:", submission.reply());
  if (submission.status !== "success") {
    return data(
      { result: submission.reply() },
      { status: submission.status !== "error" ? 400 : 200 }
    );
  }
  console.log(submission.value);
  const { createdCourse } = submission.value;
  console.log(`Created course: ${JSON.stringify(createdCourse)}`);

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

async function validateAndCreateCourse(data, ctx) {
  try {
    const result = await courseService.createCourse({
      courseName: data.courseName,
    });

    if (!result.success) {
      const errorConfig =
        COURSE_ERROR_MESSAGES[result.error.code] ||
        COURSE_ERROR_MESSAGES.DEFAULT;

      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: errorConfig.message,
        path: errorConfig.path,
      });

      return z.NEVER;
    }

    return { ...data, createdCourse: result.data };
  } catch (error) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: COURSE_ERROR_MESSAGES.SERVER_ERROR.message,
      path: COURSE_ERROR_MESSAGES.SERVER_ERROR.path,
    });
    return z.NEVER;
  }
}
