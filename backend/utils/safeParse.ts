import z from 'zod';

const safeParseBody = <T extends z.ZodObject>(zType: T, body: unknown) => {
   const parsed = zType.safeParse(body);
   if (!parsed.success) {
      throw new Error(`couldnt safe parse body: ${body}`);
   }
   return parsed.data;
};

export default safeParseBody;
