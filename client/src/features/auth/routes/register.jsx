import { ErrorList, Field, PassField } from "@/components/forms";
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
import { data, Form, redirect, useActionData } from "react-router-dom";
import { z } from "zod";
import { useIsPending } from "@/hooks/use-pending.jsx";
import { useState } from "react";
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


//  OJITO PARA VER U OCULTAR PASSWORD
const [showPassword, setShowPassword] = useState(false);

const togglePasswordVisibility = () => {
  setShowPassword((prev) => !prev); // 🔥 Alterna entre `true` y `false`
};

//  OJITO PARA VER U OCULTAR CONFPASSWORD
const [showConfPassword, setShowConfPassword] = useState(false);

const toggleConfPasswordVisibility = () => {
  setShowConfPassword((prev) => !prev); // 🔥 Alterna entre `true` y `false`
};



  return (
    <main className=" flex flex-col gap-2 pt-8 lg:pt-12 items-center lg:items-start">
      <Card className="!rounded-md w-full md:max-w-sm bg-card px-3 py-4 h-[426px] sm:w-[360px]">
        <CardHeader>
          <CardTitle className="text-2xl text-center !font-normal">
            Regístrate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...getFormProps(form)} method="post">
            <Field
              labelProps={{
                children: (
                  <>
                    Correo
                    <span className="text-destructive">*</span> {/* Asterisco rojo */}
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
                    <span className="text-destructive">*</span> {/* Asterisco rojo */}
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

            <PassField
              labelProps={{
                children: (
                  <>
                    Confirmar contraseña
                    <span className="text-destructive">*</span> {/* Asterisco rojo */}
                  </>
                ),
              }}
              inputProps={{
                ...getInputProps(fields.password, { type: "password" }), // 🔥 Mantén `{ type: "password" }`
                placeholder: "********",
                autoComplete: "current-password",
              }}
              showPassword={showConfPassword} // ✅ Estado dinámico
              togglePasswordVisibility={toggleConfPasswordVisibility} // ✅ Cambia el estado
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
            Registrarte
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
