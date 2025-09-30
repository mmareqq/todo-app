import type { Prettify } from './helperTypes';
import z from 'zod';
import { z_Id } from './id';

const z_TaskPriority = z.literal(['none', 'low', 'medium', 'high']);

const z_Task = z.object({
   id: z_Id.readonly(),
   projectId: z_Id.readonly(),
   completed: z.boolean(),
   name: z.string(),
   priority: z_TaskPriority,
   duration: z.number(),
   dueDate: z.union([z.coerce.date(), z.null()]),
});

const z_TaskDB = z.object({
   id: z_Id.readonly(),
   project_id: z_Id.readonly(),
   completed: z.coerce.boolean(),
   name: z.string(),
   priority: z_TaskPriority,
   duration: z.number(),
   due_date: z.union([z.coerce.date(), z.null()]),
});

const z_TaskCreate = z_Task.omit({ id: true });
const z_TaskUpdate = z_TaskCreate.partial();

type Task = z.infer<typeof z_Task>;
type TaskDB = z.infer<typeof z_TaskDB>;

type TaskCreate = z.infer<typeof z_TaskCreate>;
type TaskUpdate = Prettify<Partial<TaskCreate>>;

type TaskPriority = z.infer<typeof z_TaskPriority>;

export {
   z_Task,
   z_TaskDB,
   z_TaskCreate,
   z_TaskUpdate,
   TaskPriority,
   TaskCreate,
   TaskUpdate,
   Task,
   TaskDB,
};
