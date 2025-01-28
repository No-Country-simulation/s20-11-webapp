import { ErrorList, Field } from "@/Components/forms";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { StatusButton } from "@/Components/ui/status-button";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { data, Form, redirect, useActionData } from "react-router-dom";
import { z } from "zod";
import { useIsPending } from "../../../hooks/use-pending";
import { LoginSchema, RegisterSchema } from "../schemas/auth.schemas";
import { authService, requireAnonymous } from "../services/auth.service";
import { ERROR_MESSAGES } from "../utils/auth.errors";

export async function registerAction({ request }) {
  const formData = await request.formData();

  const submission = await parseWithZod(formData, {
    async: true,
    schema: LoginSchema.transform(validateAndRegister),
  });

  if (submission.status !== "success") {
    return data(
      { result: submission.reply() },
      { status: submission.status !== "error" ? 400 : 200 }
    );
  }
  const adminRoute = "/courses";
  const studentRoute = "/student";
  const redirectTo = authService.isAdmin() ? adminRoute : studentRoute;

  return redirect(redirectTo);
}

export async function registerLoader() {
  await requireAnonymous();
  return null;
}

export default function Register() {
  const actionData = useActionData();

  const isPending = useIsPending();

  const [form, fields] = useForm({
    id: "register-form",
    constraint: getZodConstraint(RegisterSchema),
    lastResult: actionData?.result,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: RegisterSchema });
    },
    shouldRevalidate: "onBlur",
  });

  return (
    <main className=" flex flex-col pt-8 lg:pt-24 items-center lg:items-start">
      <Card className=" !rounded-lg w-full md:max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center !font-normal">
            Regístrate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...getFormProps(form)} method="post">
            <Field
              labelProps={{ children: "Correo electrónico" }}
              inputProps={{
                ...getInputProps(fields.email, { type: "email" }),
                placeholder: "correo@ejemplo.com",
                autoFocus: true,
                className: "lowercase",
                autoComplete: "email",
              }}
              errors={fields.email.errors}
            />

            <Field
              labelProps={{ children: "Contraseña" }}
              inputProps={{
                ...getInputProps(fields.password, { type: "password" }),
                placeholder: "********",
                autoComplete: "current-password",
              }}
              errors={fields.password.errors}
            />

            <Field
              labelProps={{ children: "Confirmar contraseña" }}
              inputProps={{
                ...getInputProps(fields.confirmPassword, { type: "password" }),
                placeholder: "********",
                autoComplete: "confirm-password",
              }}
              errors={fields.confirmPassword.errors}
            />

            <ErrorList errors={form.errors} id={form.errorId} />
          </Form>
        </CardContent>
        <CardFooter>
          <StatusButton
            className="w-full"
            form={form.id}
            status={isPending ? "pending" : form.status ?? "idle"}
            type="submit"
            disabled={isPending}
          >
            Registrarse
          </StatusButton>
        </CardFooter>
      </Card>
    </main>
  );
}

async function validateAndRegister(data, ctx) {
  try {
    const result = await authService.register({
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    });
    if (!result.success) {
      const errorConfig =
        ERROR_MESSAGES[result.error.code] || ERROR_MESSAGES.DEFAULT;
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: errorConfig.message,
        path: errorConfig.path,
      });

      return z.NEVER;
    }
    return { ...data, authResponse: result.data };
  } catch (error) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: ERROR_MESSAGES.SERVER_ERROR.message,
      path: ERROR_MESSAGES.SERVER_ERROR.path,
    });
    return z.NEVER;
  }
}
