import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { PlusIcon, Sparkles } from "lucide-react";
import { data, useFetcher, useParams } from "react-router-dom";
import { z } from "zod";
import { ErrorList, Field } from "../../../Components/forms";
import { MobileButton } from "../../../Components/mobile-button";
import { StatusButton } from "../../../Components/ui/status-button";
import { useDialogAutoClose } from "../../../hooks/use-autoclose";
import { CreateSubjectSchema } from "../schemas/course.schemas";
import { subjectService } from "../services/subject.service";
import { COURSE_ERROR_MESSAGES } from "../utils/course.errors";

export const CREATE_SUBJECT_INTENT = "create-subject";

export function CreateSubject() {
  const createSubjectFecther = useFetcher({ key: CREATE_SUBJECT_INTENT });
  const params = useParams();

  const actionData = createSubjectFecther.data;
  const isPending = createSubjectFecther.state !== "idle";
  const shouldClose = actionData?.result.status === "success" && !isPending;

  const [open, setOpen] = useDialogAutoClose(shouldClose);

  const [form, fields] = useForm({
    id: "create-subject-form",
    constraint: getZodConstraint(CreateSubjectSchema),
    defaultValue: {},
    lastResult: actionData?.result,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: CreateSubjectSchema });
    },
    shouldRevalidate: "onBlur",
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <MobileButton Icon={PlusIcon} label="Agregar materia" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear materia</DialogTitle>
          <DialogDescription>Agrega una materia a tu curso</DialogDescription>
        </DialogHeader>
        <createSubjectFecther.Form method="post" {...getFormProps(form)}>
          <Field
            labelProps={{ children: "Nombre de la materia" }}
            inputProps={{
              ...getInputProps(fields.subjectName, { type: "text" }),
              placeholder: "Ej: Matemáticas",
              autoFocus: true,
              autoComplete: "subject-name",
            }}
            errors={fields.subjectName.errors}
          />
          <input type="hidden" name="intent" value={CREATE_SUBJECT_INTENT} />
          <input type="hidden" name="courseId" value={params.courseId} />
          <ErrorList errors={form.errors} id={form.errorId} />
        </createSubjectFecther.Form>
        <DialogFooter>
          <StatusButton
            icon={Sparkles}
            className="w-full"
            form={form.id}
            status={isPending ? "pending" : form.status ?? "idle"}
            type="submit"
            disabled={isPending}
          >
            Crear materia
          </StatusButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export async function createSubject(formData, courseId) {
  const submission = await parseWithZod(formData, {
    async: true,
    schema: CreateSubjectSchema.transform(validateAndCreateSubject),
  });
  if (submission.status !== "success") {
    return data(
      { result: submission.reply() },
      { status: submission.status !== "error" ? 400 : 200 }
    );
  }

  return { result: submission.reply() };
}

async function validateAndCreateSubject(data, ctx) {
  try {
    const result = await subjectService.createSubject(
      data.courseId,
      data.subjectName
    );

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
    return { ...data, subjectResponse: result.data };
  } catch (error) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: COURSE_ERROR_MESSAGES.SERVER_ERROR.message,
      path: COURSE_ERROR_MESSAGES.SERVER_ERROR.path,
    });
    return z.NEVER;
  }
}
