import { z } from "zod";

export const todoSchema = z.object({
  id: z.string(),
  done: z.boolean(),
  text: z.string().min(1),
  important: z.boolean().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const todosSchema = z.array(todoSchema);

export const todoUpdateSchema = z.object({
  id: z.string(),
  done: z.boolean(),
});

export const todoCreateSchema = z.object({
  text: z.string(),
  important: z.boolean(),
});
