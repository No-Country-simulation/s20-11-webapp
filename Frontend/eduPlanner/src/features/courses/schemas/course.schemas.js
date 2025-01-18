import { z } from "zod";

export const AssignClassSchema = z.object({
  blockId: z.number(),
  subjectId: z.number(),
});
