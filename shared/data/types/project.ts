import z from 'zod';
import { Id } from './id';

const z_ProjectCreate = z.object({
   name: z.string(),
});

const z_ProjectUpdate = z_ProjectCreate.partial();

type ProjectCreate = z.infer<typeof z_ProjectCreate>;

type ProjectUpdate = Partial<ProjectCreate>;

type Project = {
   readonly id: Id;
   name: string;
   readonly type: 'custom' | 'preset';
};

export {
   z_ProjectCreate,
   z_ProjectUpdate,
   Project,
   ProjectCreate,
   ProjectUpdate,
};
