import { ErrorList, Field, PassField } from "@/components/forms";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatusButton } from "@/components/ui/status-button";
import { createValidationHandler } from "@/lib/validation-handler";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { useState } from "react";
import { data, Form, redirect, useActionData } from "react-router-dom";
import { useIsPending } from "../../../hooks/use-pending";
import { LoginSchema } from "../schemas/auth.schemas";
import { authService, requireAnonymous } from "../services/auth.service";
import { ERROR_MESSAGES } from "../utils/auth.errors";

export async function loginAction({ request }) {
  const formData = await request.formData();

  const submission = await parseWithZod(formData, {
    async: true,
    schema: LoginSchema.transform(validateAndLogin),
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

export async function loginLoader() {
  await requireAnonymous();
  return null;
}

export default function Login() {
  const actionData = useActionData();
  const isPending = useIsPending();

  //  OJITO PARA VER U OCULTAR PASSWORD
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [form, fields] = useForm({
    id: "login-form",
    constraint: getZodConstraint(LoginSchema),
    lastResult: actionData?.result,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: LoginSchema });
    },
    shouldRevalidate: "onBlur",
  });

  return (
    <Card className="z-20 !rounded-lg w-full md:max-w-sm ">
      <CardHeader>
        <CardTitle className="text-2xl text-center !font-normal">
          Iniciar sesión
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...getFormProps(form)} method="post">
          <Field
            labelProps={{
              children: (
                <>
                  Correo
                  <span className="text-destructive">*</span>{" "}
                  {/* Asterisco rojo */}
                </>
              ),
            }}
            inputProps={{
              ...getInputProps(fields.email, { type: "email" }),
              placeholder: "correo@ejemplo.com",
              autoFocus: true,
              className: "lowercase",
              autoComplete: "email",
            }}
            errors={fields.email.errors}
          />

          <PassField
            labelProps={{
              children: (
                <>
                  Contraseña
                  <span className="text-destructive">*</span>{" "}
                  {/* Asterisco rojo */}
                </>
              ),
            }}
            inputProps={{
              ...getInputProps(fields.password, { type: "password" }), // 🔥 Mantén `{ type: "password" }`
              placeholder: "********",
              autoComplete: "current-password",
            }}
            showPassword={showPassword} // ✅ Estado dinámico
            togglePasswordVisibility={togglePasswordVisibility} // ✅ Cambia el estado
            errors={fields.password.errors}
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
          Iniciar sesión
        </StatusButton>
      </CardFooter>
    </Card>
  );
}

const validateAndLogin = createValidationHandler({
  serviceCall: (data) => authService.login(data),
  errorMessages: ERROR_MESSAGES,
  responseKey: "authResponse",
});
