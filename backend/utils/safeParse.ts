import z from 'zod';

export const safeParseId = (id: string) => {
   const parsed = z.number().safeParse(parseInt(id, 10));
   if (!parsed.success) {
      console.error(parsed.error.issues);
      throw new Error(`couldnt parse id: ${id}`);
   }
   return parsed.data;
};
