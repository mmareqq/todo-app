import 'dotenv/config';
import express from 'express';
import { QUERIES } from './db/queries';

const app = express();
const port = process.env.PORT || 3000;

app.get('/api/projects/:projectId', async (req, res) => {
   try {
      const [rows] = await QUERIES.getUsers();
      // @ts-expect-error TO BE DELETED
      res.send(JSON.stringify(rows[0].id));
   } catch (err) {
      console.log(err);
      res.send('something went wrong. couldnt load data from db');
   }
   res.send();
});

app.get('/', (req, res) => {
   res.send('Hello world!');
});

app.listen(port, () => {
   console.log(`server listening on port ${port}`);
});
