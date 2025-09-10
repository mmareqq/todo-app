import z from 'zod';
import { z_Id, Id } from './id';

const z_TaskPriority = z.union([
   z.literal('none'),
   z.literal('low'),
   z.literal('medium'),
   z.literal('high'),
]);

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

type Task = {
   readonly id: Id;
   projectId: string;
   completed: boolean;
   name: string;
   priority: TaskPriority;
   duration: number;
   dueDate: string | null;
   readonly createdAt: string;
};

export {
   z_TaskCreate,
   z_TaskUpdate,
   TaskPriority,
   TaskCreate,
   TaskUpdate,
   Task,
};
