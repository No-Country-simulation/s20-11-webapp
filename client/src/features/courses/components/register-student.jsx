import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatusButton } from "@/components/ui/status-button";

import { ErrorList, Field } from "@/components/forms";
import { createValidationHandler } from "@/lib/validation-handler";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { UserPlus } from "lucide-react";
import { data, useFetcher, useParams } from "react-router-dom";
import {
  RegisterStudentSchema
} from "../schemas/course.schemas";
import { studentsService } from "../services/students.service";

export const REGISTER_STUDENT_INTENT = "register-student";

export function RegisterStudent({ courseName }) {
  const registerStudentFecther = useFetcher({ key: REGISTER_STUDENT_INTENT });
  const params = useParams();

  const actionData = registerStudentFecther.data;
  const isPending = registerStudentFecther.state !== "idle";

  const [form, fields] = useForm({
    id: "register-student-form",
    constraint: getZodConstraint(RegisterStudentSchema),
    defaultValue: {},
    lastResult: actionData?.result,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: RegisterStudentSchema });
    },
    shouldRevalidate: "onBlur",
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Registrar Estudiante</CardTitle>
        <CardDescription>
          El estudiante recibirá un correo electrónico con sus credenciales de
          acceso.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <registerStudentFecther.Form method="post" {...getFormProps(form)}>
          <Field
            labelProps={{ children: "Correo electrónico" }}
            inputProps={{
              ...getInputProps(fields.email, { type: "email" }),
              placeholder: "Ej: juan@gmail.com",
              autoFocus: true,
              autoComplete: "email",
            }}
            errors={fields.email.errors}
          />
          <input type="hidden" name="intent" value={REGISTER_STUDENT_INTENT} />
          <input type="hidden" name="courseId" value={params.courseId} />
          <ErrorList errors={form.errors} id={form.errorId} />
        </registerStudentFecther.Form>
      </CardContent>
      <CardFooter>
        <StatusButton
          icon={UserPlus}
          className="w-full"
          form={form.id}
          status={isPending ? "pending" : form.status ?? "idle"}
          type="submit"
          disabled={isPending}
        >
          Registrar estudiante
        </StatusButton>
      </CardFooter>
    </Card>
  );
}

export async function registerStudentAction(formData, courseId) {
  const submission = await parseWithZod(formData, {
    async: true,
    schema: RegisterStudentSchema.transform(validateAndRegisterStudent),
  });
  if (submission.status !== "success") {
    return data(
      { result: submission.reply() },
      { status: submission.status !== "error" ? 400 : 200 }
    );
  }

  return { result: submission.reply() };
}

const validateAndRegisterStudent = createValidationHandler({
  serviceCall: (data) => studentsService.registerStudent(data.courseId, data.email),
  responseKey: "studentResponse",
});
