import { z } from "zod";

export const AssignClassSchema = z.object({
  blockId: z.number(),
  subjectId: z.number(),
});

export const CreateCourseSchema = z.object({
  courseName: z.string().min(3),
});
