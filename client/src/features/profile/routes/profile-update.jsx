import { ErrorList, Field } from "@/components/forms";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatusButton } from "@/components/ui/status-button";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { Upload } from "lucide-react";
import {
  data,
  Form,
  Link,
  redirect,
  useActionData,
  useLoaderData,
} from "react-router-dom";
import { useIsPending } from "../../../hooks/use-pending";
import { requireAuthenticated } from "../../auth/services/auth.service";
import { ProfileUpdateSchema } from "../schemas/profile.schema";
import { profileService } from "../services/profile.service";

export async function profileUpdateLoader() {
  await requireAuthenticated();

  const { data } = await profileService.getProfileInfo();

  return {
    profileInfo: data,
  };
}

export async function profileUpdateAction({ request }) {
  const formData = await request.formData();

  const submission = parseWithZod(formData, {
    schema: ProfileUpdateSchema,
  });
  if (submission.status !== "success") {
    return data(
      { result: submission.reply() },
      { status: submission.status !== "error" ? 400 : 200 }
    );
  }

  const { firstName, lastName } = submission.value;
  await profileService.updateProfileInfo({
    firstName,
    lastName,
  });

  return redirect("/profile");
}

export default function ProfileUpdate() {
  const { profileInfo } = useLoaderData();
  const actionData = useActionData();
  const isPending = useIsPending();

  const [form, fields] = useForm({
    id: "update-profile",
    constraint: getZodConstraint(ProfileUpdateSchema),
    defaultValue: {
      firstName: profileInfo.firstName ?? "",
      lastName: profileInfo.lastName ?? "",
    },
    lastResult: actionData?.result,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: ProfileUpdateSchema });
    },
    shouldRevalidate: "onBlur",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl !font-normal">Editar nombre</CardTitle>
      </CardHeader>
      <CardContent>
        <Form method="post" {...getFormProps(form)}>
          <Field
            labelProps={{ children: "Nombre(s)" }}
            inputProps={{
              ...getInputProps(fields.firstName, { type: "text" }),

              autoFocus: true,
              autoComplete: "firstName",
            }}
            errors={fields.firstName.errors}
          />
          <Field
            labelProps={{ children: "Apellido(s)" }}
            inputProps={{
              ...getInputProps(fields.lastName, { type: "text" }),

              autoComplete: "lastName",
            }}
            errors={fields.lastName.errors}
          />
        </Form>
        <ErrorList errors={form.errors} id={form.errorId} />
      </CardContent>

      <CardFooter className="justify-between items-center gap-4">
        <Link viewTransition to={".."} relative="path">
          <Button variant="ghost">Cancelar</Button>
        </Link>
        <div className="flex gap-4">
          <Button onClick={() => form.reset()} variant="secondary">
            Restaurar
          </Button>
          <StatusButton
            icon={Upload}
            className="w-full"
            form={form.id}
            status={isPending ? "pending" : form.status ?? "idle"}
            type="submit"
            disabled={isPending}
          >
            Guardar
          </StatusButton>
        </div>
      </CardFooter>
    </Card>
  );
}
