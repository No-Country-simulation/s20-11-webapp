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

export const RegisterStudentSchema = z.object({
  email: z.string().email(),
  courseId: z.number(),
});
