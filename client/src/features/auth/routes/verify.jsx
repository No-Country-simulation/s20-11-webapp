import { Field } from "@/components/forms";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatusButton } from "@/components/ui/status-button";
import { createValidationHandler } from "@/lib/validation-handler";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { MailCheck, ShieldQuestion } from "lucide-react";
import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useLocation,
} from "react-router-dom";
import { z } from "zod";
import { Spacer } from "../../../components/layout/spacer";
import { useIsPending } from "../../../hooks/use-pending";
import { authService, requireAnonymous } from "../services/auth.service";
import { ERROR_MESSAGES } from "../utils/auth.errors";

const ResendTokenSchema = z.object({
  email: z
    .string()
    .min(1, "El email es requerido")
    .email("El email es inválido"),
});

export async function verifyLoader({ request }) {
  await requireAnonymous();

  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  if (!token) {
    return { error: null };
  }

  const response = await authService.verify(token);
  if (response.success) {
    const adminRoute = "/courses";
    const studentRoute = "/student";
    const redirectTo = authService.isAdmin() ? adminRoute : studentRoute;
    return redirect(redirectTo);
  }

  return { error: response.error.message };
}
export async function verifyAction({ request }) {
  const formData = await request.formData();

  const submission = await parseWithZod(formData, {
    async: true,
    schema: ResendTokenSchema.transform(validateAndResendToken),
  });

  if (submission.status !== "success") {
    return data(
      { result: submission.reply() },
      { status: submission.status !== "error" ? 400 : 200 }
    );
  }

  return redirect("/verify?resend=success");
}

export default function Verify() {
  const { error } = useLoaderData();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const resendSuccess = params.get("resend") === "success"; // 🤮

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100dvh-10rem)]  ">
        <Card className="w-full max-w-md">
          <CardHeader className="justify-center flex items-center mb-2">
            <ShieldQuestion className="w-12 h-12 text-primary" />
            <CardTitle className="text-2xl text-center">
              Algo salió mal
            </CardTitle>
            <CardDescription className="text-center text-balance">
              {error}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100dvh-10rem)]  ">
      <Card className="w-full max-w-md">
        <CardHeader className="justify-center flex items-center mb-2">
          <MailCheck className="w-12 h-12 text-primary" />
          <CardTitle className="text-2xl text-center">
            Verifica tu cuenta
          </CardTitle>
          <CardDescription className="text-center text-balance">
            Hemos enviado un correo electrónico con un enlace para verificar tu
            cuenta. Por favor, revisa tu bandeja de entrada y sigue las
            instrucciones.
          </CardDescription>
        </CardHeader>
        <CardContent className="bg-secondary/20">
          <Spacer size="3xs" />
          {!resendSuccess && <ResendCode />}
          {resendSuccess && (
            <div className="text-sm text-center font-semibold text-muted-foreground">
              Código de Verificación reenviado
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function ResendCode() {
  const actionData = useActionData();

  const isPending = useIsPending();

  const [form, fields] = useForm({
    id: "resend-token-form",
    constraint: getZodConstraint(ResendTokenSchema),
    lastResult: actionData?.result,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: ResendTokenSchema });
    },
    shouldRevalidate: "onBlur",
  });

  return (
    <>
      <p className="text-xs text-muted-foreground text-center mt-4 mb-1">
        ¿No recibiste el código?
      </p>
      <Form method="post" {...getFormProps(form)} className="w-full">
        <Field
          inputProps={{
            ...getInputProps(fields.email, { type: "email" }),
            placeholder: "Ingresa tu correo electrónico",
            autoComplete: "resend-email",
            className: "text-center",
          }}
          errors={fields.email.errors}
        />

        <StatusButton
          className="w-full"
          variant="outline"
          form={form.id}
          status={isPending ? "pending" : form.status ?? "idle"}
          type="submit"
          disabled={isPending}
        >
          Reenviar código de verificación
        </StatusButton>
      </Form>
    </>
  );
}

const validateAndResendToken = createValidationHandler({
  serviceCall: (data) => authService.resendVerification(data.email),
  errorMessages: ERROR_MESSAGES,
  responseKey: "resendTokenResponse",
});
