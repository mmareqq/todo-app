import z from 'zod';
import { z_Id } from './id';

const z_Project = z.object({
   id: z_Id,
   name: z.string(),
   type: z.literal(['custom', 'preset']),
});

const z_ProjectCreate = z.object({
   name: z.string(),
   type: z.literal(['custom', 'preset']),
});

const z_ProjectUpdate = z.object({ name: z.string().optional() });

type ProjectCreate = z.infer<typeof z_ProjectCreate>;
type ProjectCreatetWithUser = ProjectCreate & { user_id: string };

type ProjectUpdate = {
   name?: string;
};

type Project = z.infer<typeof z_Project>;

export {
   z_Project,
   z_ProjectCreate,
   z_ProjectUpdate,
   Project,
   ProjectCreate,
   ProjectUpdate,
   ProjectCreatetWithUser,
};
