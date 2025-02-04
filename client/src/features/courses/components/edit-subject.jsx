import { ErrorList, Field } from "@/components/forms";
import { Button } from "@/components/ui/button";
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
import { Edit } from "lucide-react";
import { data, useFetcher, useParams } from "react-router-dom";
import { EditSubjectSchema } from "../schemas/course.schemas";
import { subjectService } from "../services/subject.service";
import { COURSE_ERROR_MESSAGES } from "../utils/course.errors";

export function EditSubject({ trigger, subject }) {
  const editSubjectFetcher = useFetcher({ key: "edit-subject" });
  const params = useParams();

  const actionData = editSubjectFetcher.data;
  const isPending = editSubjectFetcher.state !== "idle";
  const shouldClose = actionData?.result.status === "success" && !isPending;

  console.log(`ActionData: ${JSON.stringify(actionData, null, 2)}`);

  const [open, setOpen] = useDialogAutoClose(shouldClose);

  const [form, fields] = useForm({
    id: `edit-subject-form`,
    constraint: getZodConstraint(EditSubjectSchema),
    defaultValue: {
      subjectName: subject.name,
      teacherName: subject.teacherName,
      color: subject.color.light,
    },

    lastResult: editSubjectFetcher.state === "idle" ? actionData?.result : null,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: EditSubjectSchema });
    },
    shouldRevalidate: "onBlur",
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="!max-w-md">
        <DialogHeader>
          <DialogTitle>Editar materia</DialogTitle>
          <DialogDescription>
            Modifica los detalles de la materia
          </DialogDescription>
        </DialogHeader>
        <editSubjectFetcher.Form method="post" {...getFormProps(form)}>
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
          <Field
            labelProps={{ children: "Profesor asignado" }}
            inputProps={{
              ...getInputProps(fields.teacherName, { type: "text" }),

              autoComplete: "teacher-name",
            }}
            errors={fields.teacherName.errors}
          />
          <Field
            labelProps={{ children: "Color" }}
            inputProps={{
              ...getInputProps(fields.color, { type: "color" }),

              autoComplete: "subject-color",
            }}
            errors={fields.color.errors}
          />

          <input type="hidden" name="intent" value={"edit-subject"} />
          <input type="hidden" name="courseId" value={params.courseId} />
          <input type="hidden" name="subjectId" value={subject.id} />
          <ErrorList errors={form.errors} id={form.errorId} />
        </editSubjectFetcher.Form>
        <DialogFooter>
          <Button type="reset" form={form.id} variant="ghost">
            Restaurar
          </Button>
          <StatusButton
            icon={Edit}
            className="w-full"
            form={form.id}
            status={isPending ? "pending" : form.status ?? "idle"}
            type="submit"
            disabled={isPending}
          >
            Actualizar
          </StatusButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export async function updateSubject(formData) {
  const submission = await parseWithZod(formData, {
    async: true,
    schema: EditSubjectSchema.transform(validateAndUpdateSubject),
  });
  if (submission.status !== "success") {
    return data(
      { result: submission.reply() },
      { status: submission.status !== "error" ? 400 : 200 }
    );
  }

  const dataResult = submission.reply();
  const withReset = submission.reply({ resetForm: true });

  return {
    result: {
      ...dataResult,
      ...withReset,
    },
  };
}

const validateAndUpdateSubject = createValidationHandler({
  serviceCall: (data) => subjectService.updateSubjectData(data),
  errorMessages: COURSE_ERROR_MESSAGES,
  responseKey: "subjectResponse",
});
