import 'dotenv/config';
import env from '../utils/envSchema';

const config = {
   port: env.SINGLESTORE_PORT,
   host: env.SINGLESTORE_HOST,
   user: env.SINGLESTORE_USER,
   database: env.SINGLESTORE_DB_NAME,
   password: env.SINGLESTORE_PASSWORD,
   ssl: {},
   waitForConnections: true,
   connectionLimit: 10,
   queueLimit: 0,
};

export default config;
