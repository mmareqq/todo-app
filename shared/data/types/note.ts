import z from 'zod';
import { Id } from './id';

const z_NoteColor = z.enum([
   'blue',
   'red',
   'green',
   'orange',
   'purple',
   'yellow',
]);
const z_NoteSize = z.enum(['sm', 'md', 'lg', 'xl']);

const z_NoteCreate = z.object({
   title: z.string(),
   description: z.string(),
   color: z_NoteColor,
   x: z.number(),
   y: z.number(),
   size: z_NoteSize,
});

const z_NoteUpdate = z_NoteCreate.partial();

type NoteUpdate = Partial<z.infer<typeof z_NoteCreate>>;

type NoteCreate = z.infer<typeof z_NoteCreate>;
type NoteColor = z.infer<typeof z_NoteColor>;
type NoteSize = z.infer<typeof z_NoteSize>;

type Note = {
   readonly id: Id;
   title: string;
   description: string;
   color: NoteColor;
   x: number;
   y: number;
   size: NoteSize;
};

export {
   z_NoteCreate,
   z_NoteUpdate,
   NoteCreate,
   NoteColor,
   NoteUpdate,
   NoteSize,
   Note,
};
