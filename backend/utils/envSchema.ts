import z from 'zod';
import 'dotenv/config';

const envSchema = z.object({
   PORT: z.coerce.number().int().min(0).max(65535),
   SINGLESTORE_PORT: z.coerce.number().int().min(0).max(65535),
   SINGLESTORE_HOST: z.string(),
   SINGLESTORE_USER: z.string(),
   SINGLESTORE_DB_NAME: z.string(),
   SINGLESTORE_PASSWORD: z.string(),
});

const envSchemaParsed = envSchema.safeParse(process.env);

if (!envSchemaParsed.success) {
   console.error(envSchemaParsed.error.issues);
   process.exit(1);
}

const env = envSchemaParsed.data;

export default env;
