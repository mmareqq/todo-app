import z from 'zod';
import { z_Id } from './id';

const z_Project = z.object({
   id: z_Id.readonly(),
   name: z.string(),
   type: z.literal(['custom', 'preset']).readonly(),
});

const z_ProjectCreate = z_Project.omit({ id: true, type: true });

const z_ProjectUpdate = z_ProjectCreate.partial();

type ProjectCreate = z.infer<typeof z_ProjectCreate>;
type ProjectUpdate = Partial<ProjectCreate>;

type Project = z.infer<typeof z_Project>;

export {
   z_Project,
   z_ProjectCreate,
   z_ProjectUpdate,
   Project,
   ProjectCreate,
   ProjectUpdate,
};
