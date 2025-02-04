import { z } from "zod";

export const AssignClassSchema = z.object({
  blockId: z.number(),
  subjectId: z.number(),
});

export const CreateCourseSchema = z.object({
  courseName: z.string().min(3),
});

export const CreateSubjectSchema = z.object({
  subjectName: z.string().min(3),
  courseId: z.number(),
});

export const EditSubjectSchema = z.object({
  subjectName: z
    .string()
    .min(3, {
      message: "El nombre de la asignatura debe tener al menos 3 caracteres.",
    })
    .max(20, {
      message:
        "El nombre de la asignatura no puede tener más de 20 caracteres.",
    }),
  teacherName: z
    .string()
    .min(3, {
      message: "El nombre del profesor debe tener al menos 3 caracteres.",
    })
    .max(20, {
      message: "El nombre del profesor no puede tener más de 20 caracteres.",
    }).optional(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, {
    message: "El color debe ser un código hexadecimal válido (ej. #FF5733).",
  }),

  courseId: z.number(),
  subjectId: z.number(),
});

export const CreateEventSchema = z.object({
  title: z.string(),
  message: z.string(),
  courseId: z.number(),
  subjectId: z.number(),
  scheduledFor: z.date().refine((date) => date >= new Date(), {
    message: "La fecha y hora no pueden estar en el pasado",
  }),
});

export const RegisterStudentSchema = z.object({
  email: z.string().email(),
  courseId: z.number(),
});
