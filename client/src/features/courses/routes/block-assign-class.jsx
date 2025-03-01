import { SelectWrapper } from "@/components/forms";
import { Spacer } from "@/components/layout/spacer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusButton } from "@/components/ui/status-button";
import { useIsPending } from "@/hooks/use-pending";
import { getFormProps, useForm, useInputControl } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useParams,
} from "react-router-dom";
import { AssignClassSchema } from "../schemas/course.schemas";
import { subjectService } from "../services/subject.service";

export async function assignClassLoader({ params }) {
  const { data } = await subjectService.getSubjects(params.courseId);
  return { subjects: data };
}

export async function assignClassAction({ request, params }) {
  const formData = await request.formData();

  const submission = parseWithZod(formData, {
    schema: AssignClassSchema,
  });

  if (submission.status !== "success") {
    return data(
      { result: submission.reply() },
      { status: submission.status !== "error" ? 400 : 200 }
    );
  }

  const { blockId, subjectId } = submission.value;

  await subjectService.assignSubjectToBlock(params.courseId, blockId, subjectId);

  return redirect(`/courses/${params.courseId}/schedule`);
}

export default function AssignClass() {
  const { subjects } = useLoaderData();
  const actionData = useActionData();
  const params = useParams();
  const isPending = useIsPending();

  const blockId = params.blockId;

  const [form, fields] = useForm({
    id: "assign-subject-to-block-form",
    constraint: getZodConstraint(AssignClassSchema),
    defaultValue: {},
    lastResult: actionData?.result,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: AssignClassSchema });
    },
    shouldRevalidate: "onBlur",
  });

  const subject = useInputControl(fields.subjectId);

  return (
    <Form {...getFormProps(form)} method="POST" className="flex flex-col gap-2">
      <input type="hidden" name="blockId" value={blockId} />
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

      <Spacer size="4xs" />
      <StatusButton
        className=""
        form={form.id}
        status={isPending ? "pending" : form.status ?? "idle"}
        type="submit"
        disabled={isPending}
      >
        Asignar
      </StatusButton>
    </Form>
  );
}
