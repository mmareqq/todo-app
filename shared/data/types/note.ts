import z from 'zod';
import { z_Id } from './id';

const z_NoteColor = z.literal([
   'blue',
   'red',
   'green',
   'orange',
   'purple',
   'yellow',
]);

const z_NoteSize = z.literal(['sm', 'md', 'lg', 'xl']);

const z_Note = z.object({
   id: z_Id.readonly(),
   title: z.string(),
   description: z.string(),
   color: z_NoteColor,
   x: z.number(),
   y: z.number(),
   size: z_NoteSize,
});

const z_NoteCreate = z_Note.omit({ id: true });
const z_NoteUpdate = z_NoteCreate.partial();

type Note = z.infer<typeof z_Note>;
type NoteCreate = z.infer<typeof z_NoteCreate>;
type NoteUpdate = Partial<NoteCreate>;

type NoteColor = z.infer<typeof z_NoteColor>;
type NoteSize = z.infer<typeof z_NoteSize>;

export {
   z_Note,
   z_NoteCreate,
   z_NoteUpdate,
   Note,
   NoteCreate,
   NoteColor,
   NoteUpdate,
   NoteSize,
};
