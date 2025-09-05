import 'dotenv/config';

function getEnvVar(key: string) {
   const val = process.env[key];
   if (!val) {
      throw new Error(`Missing required environment variable: ${key}`);
   }
   return val;
}

const config = {
   port: parseInt(getEnvVar('SINGLESTORE_PORT')),
   host: getEnvVar('SINGLESTORE_HOST'),
   user: getEnvVar('SINGLESTORE_USER'),
   database: getEnvVar('SINGLESTORE_DB_NAME'),
   password: getEnvVar('SINGLESTORE_PASSWORD'),
   ssl: {},
   waitForConnections: true,
   connectionLimit: 10,
   queueLimit: 0,
};

export default config;
