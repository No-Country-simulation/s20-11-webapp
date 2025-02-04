import { ErrorList, Field } from "@/components/forms";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { StatusButton } from "@/components/ui/status-button";
import { useDialogAutoClose } from "@/hooks/use-autoclose.jsx";
import { createValidationHandler } from "@/lib/validation-handler";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { Sparkles } from "lucide-react";
import { data, useFetcher, useParams } from "react-router-dom";
import { CreateSubjectSchema } from "../schemas/course.schemas";
import { subjectService } from "../services/subject.service";
import { COURSE_ERROR_MESSAGES } from "../utils/course.errors";

export function CreateSubject({ trigger }) {
  const createSubjectFecther = useFetcher({ key: "create-subject" });
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
        {/* <MobileButton Icon={PlusIcon} label="Agregar materia" /> */}
        {trigger}
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
          <input type="hidden" name="intent" value={"create-subject"} />
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

const validateAndCreateSubject = createValidationHandler({
  serviceCall: (data) =>
    subjectService.createSubject(data.courseId, data.subjectName),
  errorMessages: COURSE_ERROR_MESSAGES,
  responseKey: "subjectResponse",
});
