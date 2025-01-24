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
import { LoginSchema } from "../schemas/auth.schemas";
import { authService, requireAnonymous } from "../services/auth.service";
import { ERROR_MESSAGES } from "../utils/auth.errors";

// Tanto Loaders como Actions tienen acceso al [request] que es un objeto que contiene los datos de la request HTTP. También, de ser necesario tienen acceso a los [params], que son los parámetros de la URL.
export async function loginAction({ request }) {
  const formData = await request.formData(); // Se obtiene el FormData de la request

  const submission = await parseWithZod(formData, {
    async: true,
    schema: LoginSchema.transform(validateAndLogin),
  }); // Se parsea el FormData según el schema de validación y posteriormente se valida desde backend mediante la funcion validateAndLogin. La puedes ver mas abajo.

  // La validación puede fallar, y en ese caso, se retorna un objeto con los errores de validación y no se ejecuta el resto del 'loginAction'.
  if (submission.status !== "success") {
    return data(
      { result: submission.reply() },
      { status: submission.status !== "error" ? 400 : 200 }
    );
  }

  // Si la validación es exitosa, podemos extraer los datos del submission de forma segura.
  // Como no vamos a utilizar los valores, los dejo comentados, pero quedan como referencia.
  // const { email, password } = submission.value;

  // En este punto, significa que ya hemos validado el login, por lo tanto podemos obtener datos desde el localStorage. Vamos a usar esos datos para saber donde redirigir al usuario:
  const adminRoute = "/courses";
  const studentRoute = "/student";
  const redirectTo = authService.isAdmin() ? adminRoute : studentRoute;

  return redirect(redirectTo);
}

// El loader se ejecuta antes de que se renderice el componente. Se puede usar para cargar datos o hacer validaciones previas.
export async function loginLoader() {
  await requireAnonymous(); // Esta función no deja a un usuario autenticado acceder a la ruta de login. Lo redirige a la ruta de home. ("/")

  return null;
}

export default function Login() {
  const actionData = useActionData(); // Traemos el resultado (return) de la función loginAction

  const isPending = useIsPending(); // Este hook nos devuelve un booleano que indica si existe una navegación o solicitud pendiente. Sirve para condicionalmente mostrar íconos de carga, o desactivar botones.

  //Para el manejo de formularios y validación, yo utilizo Conform en lugar de Formik, ya que se integra de mucho mejor manera con la API de react-router:
  const [form, fields] = useForm({
    id: "login-form",
    // Aplica las restricciones de validación del schema que creamos, para realizar validaciones a nivel de cliente.
    constraint: getZodConstraint(LoginSchema),
    // Resultado de la última submission del formulario, típicamente errores de validación del servidor
    lastResult: actionData?.result,
    // Define cómo validar el formulario usando el esquema Zod cuando se envían los datos
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: LoginSchema });
    },
    // Determina cuándo re-validar si los campos estan correctos segun la validación del schema: 'onBlur' revalidaria cada vez que el usuario haga click fuera de un input (cuando pierde el focus)
    shouldRevalidate: "onBlur",
  });

  // Notarás que queda un espacio vacío entre los Inputs y el botón de submit.
  // Esto es necesario, ya que ahi se renderizan los errores de validación sin producir un layout-shift.

  // StatusButton: Este componente utiliza el hook isPending en combinación con el estado del formulario para mostrar un estado de carga mediante un icono animado.

  // {...getFormProps(form)} retorna un objeto con las propiedades del formulario que definimos arriba, y las asigna a la etiqueta Form. Es equivalente a: <Form id={form.id} onSubmit={form.submit}/> , etc.

  // Lo mismo aplica para los Inputs y {...getInputProps(fields.email, { type: "email" })}
  return (
    <main className=" flex flex-col pt-8 lg:pt-24 items-center lg:items-start">
      <Card className=" !rounded-lg w-full md:max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center !font-normal">
            Iniciar sesión
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

            <ErrorList errors={form.errors} id={form.errorId} />
          </Form>
        </CardContent>
        <CardFooter>
          {/*
           * Al hacer submit desde un formulario en React Router:
           * 1. Se intercepta el envío del formulario
           * 2. Se crea una request con los datos del FormData
           * 3. Se ejecuta la función 'action' definida en el router para esta ruta (/login)
           * 4. El resultado del action se puede acceder via useActionData()
           */}
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
    </main>
  );
}

// Función que transforma el Schema de validación. Actualmente el schema de validación solo contiene validaciones a nivel de cliente. Esta función se encarga de agregar validaciones a nivel de servidor.
// data: Los datos ya validados por el schema Zod. Contiene email y password que pasaron las validaciones del LoginSchema
// ctx: Contexto de validación de Zod que permite añadir errores personalizados mediante ctx.addIssue(). Se usa para agregar errores del backend al flujo de validación
async function validateAndLogin(data, ctx) {
  try {
    // Intentamos hacer login con los datos recibidos
    // authService.login retorna una promesa con la respuesta del backend
    const result = await authService.login({
      email: data.email,
      password: data.password,
    });

    // Si la respuesta indica que no fue exitosa (result.success === false)
    if (!result.success) {
      // Buscamos el mensaje de error correspondiente al código de error recibido (ver auth.errors.js)
      // Si no existe un mensaje para ese código, usamos el mensaje DEFAULT
      const errorConfig =
        ERROR_MESSAGES[result.error.code] || ERROR_MESSAGES.DEFAULT;

      // Añadimos un error personalizado al contexto de validación usando Zod
      // Esto es lo que permite mostrar un msj de error al usuario bajo los inputs, o a nivel de formulario.
      ctx.addIssue({
        code: z.ZodIssueCode.custom, // Tipo de error: personalizado
        message: errorConfig.message, // Mensaje de error para mostrar al usuario
        path: errorConfig.path, // Campo del formulario al que corresponde el error
      });

      // z.NEVER indica a Zod que la validación falló y debe detenerse
      return z.NEVER;
    }
    return { ...data, authResponse: result.data };
  } catch (error) {
    // Si ocurre un error inesperado (ej: error de red)
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: ERROR_MESSAGES.SERVER_ERROR.message, // Mensaje de error del servidor
      path: ERROR_MESSAGES.SERVER_ERROR.path, // Error general, no asociado a un campo específico
    });
    return z.NEVER;
  }
}
