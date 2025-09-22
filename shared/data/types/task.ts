import z from 'zod';
import { z_Id } from './id';

const z_TaskPriority = z.literal(['none', 'low', 'medium', 'high']);

const z_Task = z.object({
   id: z_Id.readonly(),
   projectId: z.string(),
   completed: z.boolean(),
   name: z.string(),
   priority: z_TaskPriority,
   duration: z.number(),
   dueDate: z.union([z.string(), z.null()]),
});

const z_TaskCreate = z.object({
   name: z.string(),
   projectId: z_Id,
   completed: z.boolean(),
   priority: z_TaskPriority,
   duration: z.number(),
   dueDate: z.union([z.string(), z.null()]),
});

const z_TaskUpdate = z_TaskCreate.partial();

type TaskCreate = z.infer<typeof z_TaskCreate>;
type TaskUpdate = Partial<TaskCreate>;

type TaskPriority = z.infer<typeof z_TaskPriority>;

type Task = z.infer<typeof z_Task>;

export {
   z_Task,
   z_TaskCreate,
   z_TaskUpdate,
   TaskPriority,
   TaskCreate,
   TaskUpdate,
   Task,
};
