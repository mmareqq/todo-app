import 'dotenv/config';
import express from 'express';
import mysql from 'mysql2/promise';

const app = express();
const port = process.env.PORT || 3000;

function getEnvVar(key: string) {
   const val = process.env[key];
   if (!val) {
      throw new Error(`Missing required environment variable: ${key}`);
   }
   return val;
}

try {
   const conn = await mysql.createConnection({
      port: parseInt(getEnvVar('SINGLESTORE_PORT')),
      host: getEnvVar('SINGLESTORE_HOST'),
      user: getEnvVar('SINGLESTORE_USER'),
      database: getEnvVar('SINGLESTORE_DB_NAME'),
      password: getEnvVar('SINGLESTORE_PASSWORD'),
      ssl: {},
   });
} catch (err) {
   console.log(err);
   process.exit(1);
}

app.get('/api/projects/:projectId', (req, res) => {
   res.send(`Getting project  ${req.params.projectId} from DB`);
});

app.get('/', (req, res) => {
   res.send('Hello world!');
});

app.listen(port, () => {
   console.log(`server listening on port ${port}`);
});
