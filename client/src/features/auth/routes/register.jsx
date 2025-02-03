import { ErrorList, Field, PassField } from "@/components/forms";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatusButton } from "@/components/ui/status-button";
import { useIsPending } from "@/hooks/use-pending.jsx";
import { createValidationHandler } from "@/lib/validation-handler";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { useState } from "react";
import { data, Form, redirect, useActionData } from "react-router-dom";
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


  return redirect("/verify");
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

            <PassField
              labelProps={{
                children: (
                  <>
                    Confirmar contraseña
                    <span className="text-destructive">*</span>{" "}
                    {/* Asterisco rojo */}
                  </>
                ),
              }}
              inputProps={{
                ...getInputProps(fields.confirmPassword, { type: "password" }), // 🔥 Mantén `{ type: "password" }`
                placeholder: "********",
                autoComplete: "current-password",
              }}
              showPassword={showConfPassword} // ✅ Estado dinámico
              togglePasswordVisibility={toggleConfPasswordVisibility} // ✅ Cambia el estado
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

const validateAndRegister = createValidationHandler({
  serviceCall: (data) => authService.register(data),
  errorMessages: ERROR_MESSAGES,
  responseKey: "authResponse",
});
