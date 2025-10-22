import z from 'zod';

export const z_projectParam = z.object({ projectId: z.string() });
export const z_taskParam = z.object({ taskId: z.string() });
export const z_noteParam = z.object({ noteId: z.string() });
