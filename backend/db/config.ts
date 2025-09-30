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
   dateStrings: true,
   typeCast: (field: any, next: any) => {
      if (field.type === 'TINY' && field.length === 1) {
         return field.string() === '1';
      }
      if (field.type === 'DATETIME' || field.type === 'TIMESTAMP') {
         const value = field.string();
         return value ? new Date(value) : null;
      }
      return next();
   },
};

export default config;
