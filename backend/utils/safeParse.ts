import z from 'zod';
import { Id } from '@types';

export const safeParseBody = <T extends z.ZodObject>(
   zType: T,
   body: unknown,
) => {
   const parsed = zType.safeParse(body);
   if (!parsed.success) {
      console.error(parsed.error.issues);
      throw new Error(`couldnt safe parse body: ${body}`);
   }
   return parsed.data;
};

export const safeParseId = (id: string): Id => {
   const parsed = z.number().safeParse(parseInt(id, 10));
   if (!parsed.success) {
      console.error(parsed.error.issues);
      throw new Error(`couldnt safe parse id: ${id}`);
   }
   return parsed.data;
};
