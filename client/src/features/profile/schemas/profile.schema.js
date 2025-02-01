import { z } from "zod";

export const ProfileUpdateSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres." }),
  lastName: z
    .string()
    .min(3, { message: "El apellido debe tener al menos 3 caracteres." }),
});
