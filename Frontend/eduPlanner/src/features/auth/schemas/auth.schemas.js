import { z } from "zod";

/*
Movemos toda la lógica de validación a un archivo de schemas para mejor organización
y claridad en el código. Puedes usar yup o zod, en este caso usamos zod.
*/

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "El email es requerido")
    .email("El email es inválido"),
  password: z.string().min(8, "La contraseña es demasiado corta"), // TIP: La validación de la longitud de la contraseña no debería aplicarse en login, solo en el registro de usuarios. Yo quitaría esta validación.
});

export const RegisterSchema = LoginSchema.extend({
  confirmPassword: z.string().min(8, "La contraseña es demasiado corta"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});
