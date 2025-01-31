import { ErrorList, Field, SelectWrapper } from "@/components/forms";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusButton } from "@/components/ui/status-button";
import { useDialogAutoClose } from "@/hooks/use-autoclose.jsx";
import { createValidationHandler } from "@/lib/validation-handler";
import {
  getFormProps,
  getInputProps,
  useForm,
  useInputControl,
} from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { Bell, BellPlus } from "lucide-react";
import { data, useFetcher, useParams } from "react-router-dom";
import { Spacer } from "../../../components/layout/spacer";
import { Button } from "../../../components/ui/button";
import { CreateEventSchema } from "../schemas/course.schemas";
import { notificationsService } from "../services/notifications.service";
import { COURSE_ERROR_MESSAGES } from "../utils/course.errors";
import { DateTimePicker } from "./date-time-picker";

export function CreateEvent({ subjects }) {
  const createEventFetcher = useFetcher({ key: "create-event" });
  const params = useParams();

  const actionData = createEventFetcher.data;
  const isPending = createEventFetcher.state !== "idle";
  const shouldClose = actionData?.result.status === "success" && !isPending;

  const [open, setOpen] = useDialogAutoClose(shouldClose);

  const [form, fields] = useForm({
    id: "create-event-form",
    constraint: getZodConstraint(CreateEventSchema),
    defaultValue: {},
    lastResult: actionData?.result,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: CreateEventSchema });
    },
    shouldRevalidate: "onBlur",
  });

  const subject = useInputControl(fields.subjectId);
  return (
    <Dialog open={open} onOpenChange={setOpen} className="">
      <DialogTrigger asChild>
        <Button>
          <BellPlus /> Publicar Evento
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Publicar Evento</DialogTitle>
          <DialogDescription>
            Se enviará una notificación a todos los estudiantes del curso.
          </DialogDescription>
        </DialogHeader>
        <createEventFetcher.Form method="post" {...getFormProps(form)}>
          <Field
            labelProps={{ children: "Título" }}
            inputProps={{
              ...getInputProps(fields.title, { type: "text" }),
              autoFocus: true,
              autoComplete: "event-title",
            }}
            errors={fields.title.errors}
          />
          <Field
            labelProps={{ children: "Descripción" }}
            inputProps={{
              ...getInputProps(fields.message, { type: "text" }),
              autoComplete: "event-description",
            }}
            errors={fields.message.errors}
          />

          <SelectWrapper errors={fields.subjectId.errors}>
            <Select
              onValueChange={subject.change}
              name={fields.subjectId.name}
              value={subject.value}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona una materia" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject.id} value={subject.id.toString()}>
                    <div className="flex items-center gap-2">
                      <div
                        style={{
                          "--subject-color-dark": subject.color.dark,
                          "--subject-color-light": subject.color.light,
                        }}
                        className="size-4 rounded-full bg-[var(--subject-color-light)] dark:bg-[var(--subject-color-dark)]"
                      ></div>
                      {subject.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </SelectWrapper>
          <Spacer size="3xs" />
          <DateTimePicker form={form} fields={fields} />
          <ErrorList errors={fields.scheduledFor.errors} />
          <Spacer size="4xs" />
          <input
            type="hidden"
            name="scheduledFor"
            value={fields.scheduledFor}
          />
          <input type="hidden" name="intent" value={"create-event"} />
          <input type="hidden" name="courseId" value={params.courseId} />
          <ErrorList errors={form.errors} id={form.errorId} />
        </createEventFetcher.Form>
        <DialogFooter>
          <StatusButton
            icon={Bell}
            className="w-full"
            form={form.id}
            status={isPending ? "pending" : form.status ?? "idle"}
            type="submit"
            disabled={isPending}
          >
            Publicar
          </StatusButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export async function createEvent(formData) {
  const submission = await parseWithZod(formData, {
    async: true,
    schema: CreateEventSchema.transform(validateAndCreateEvent),
  });
  if (submission.status !== "success") {
    return data(
      { result: submission.reply() },
      { status: submission.status !== "error" ? 400 : 200 }
    );
  }

  return { result: submission.reply() };
}

const validateAndCreateEvent = createValidationHandler({
  serviceCall: (data) =>
    notificationsService.createEvent({
      title: data.title,
      message: data.message,
      subjectId: data.subjectId,
      scheduledFor: toUTCISO(data.scheduledFor),
      courseId: data.courseId,
    }),
  errorMessages: COURSE_ERROR_MESSAGES,
  responseKey: "eventResponse",
});

const toUTCISO = (date) => {
  if (!date) return null;
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes()
    )
  ).toISOString();
};
