import RegisterImg from "@/assets/register.jpg";
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
import { Info } from "lucide-react";
import { useState } from "react";
import { data, Form, Link, redirect, useActionData } from "react-router-dom";
import { useIsMobile } from "../../../hooks/use-mobile";
import { LoginSchema, RegisterSchema } from "../schemas/auth.schemas";
import { authService, requireAnonymous } from "../services/auth.service";

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
    <main className="sm:border sm:shadow grid lg:grid-cols-2 rounded-xl overflow-clip h-[calc(100dvh-6.5rem)] place-content-stretch">
      <Card className="!rounded-lg !p-1 sm:!p-12 2xl:!p-32 !w-full h-full !border-none !bg-transparent sm:!bg-card">
        <div className="h-[85%]  ">
          <CardHeader>
            <CardTitle className="text-xl sm:text-3xl text-start font-black tracking-normal">
              Registro de Coordinador
            </CardTitle>
            <div className="text-muted-foreground text-xs sm:text-sm">
              ¿Ya tienes una cuenta?{" "}
              <Link viewTransition className="text-primary" to={"/"}>
                Inicia sesión
              </Link>
            </div>
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
                  ...getInputProps(fields.confirmPassword, {
                    type: "password",
                  }), // 🔥 Mantén `{ type: "password" }`
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
          <CardFooter className="flex-col w-full">
            <StatusButton
              className="w-full"
              form={form.id}
              status={isPending ? "pending" : form.status ?? "idle"}
              type="submit"
              disabled={isPending}
            >
              Registrarse como coordinador
            </StatusButton>
            <p className="text-xs text-center text-muted-foreground mt-2 text-balance">
              Al registrarte, aceptas nuestros{" "}
              <a href="#" className="underline hover:text-primary">
                Términos de servicio{" "}
              </a>
              y{" "}
              <a href="#" className="underline hover:text-primary">
                Política de privacidad
              </a>
              .
            </p>
          </CardFooter>
        </div>
        <RegisterAlert />
      </Card>
      <div
        style={{ backgroundImage: `url(${RegisterImg})` }}
        className="hidden lg:grid h-full relative bg-cover"
      >
        <div className="bg-gradient-to-r from-background via-background/20 to-background/10 absolute inset-0 z-10 flex "></div>
      </div>
    </main>
  );
}




const validateAndRegister = createValidationHandler({
  serviceCall: (data) => authService.register(data),
  responseKey: "authResponse",
});

function RegisterAlert() {
  const isMobile = useIsMobile();
  return (
    <div className="bg-primary/5 border-l-4 border-primary p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <Info className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
        <div className="ml-3">
          {!isMobile && (
            <p className="text-sm text-primary">
              Los estudiantes solo pueden ser registrados por un Coordinador.
            </p>
          )}
          <span className="block text-sm text-primary">
            Si eres estudiante, por favor contacta a tu Coordinador para obtener
            acceso.
          </span>
        </div>
      </div>
    </div>
  );
}
