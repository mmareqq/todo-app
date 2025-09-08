import 'dotenv/config';
import express from 'express';
import { MUTATIONS, QUERIES } from './db/queries';

const app = express();
const port = process.env.PORT || 3000;

// --- PROJECTS ---
// get all projects
app.get('/api/projects', async (req, res) => {
   try {
   } catch (err) {
      console.log(err);
      res.send('something went wrong.');
   }
});

// get project with the id
app.get('/api/projects/:projectId', async (req, res) => {
   try {
   } catch (err) {
      console.log(err);
      res.send('something went wrong.');
   }
});
// update project
app.patch('/api/projects/:projectId', async (req, res) => {
   try {
   } catch (err) {
      console.log(err);
      res.send('something went wrong.');
   }
});
// delete project
app.delete('/api/projects/:projectId', async (req, res) => {
   try {
   } catch (err) {
      console.log(err);
      res.send('something went wrong.');
   }
});

// --- NOTES ---

// get all notes
app.get('/api/notes', async (req, res) => {
   try {
   } catch (err) {
      console.log(err);
      res.send('something went wrong.');
   }
});

// update a note with id (now it replaces whole note). fix it to patch
app.put('/api/notes/:noteId', async (req, res) => {
   try {
   } catch (err) {
      console.log(err);
      res.send('something went wrong.');
   }
});

// delete a note with id
app.delete('/api/notes/:noteId', async (req, res) => {
   try {
   } catch (err) {
      console.log(err);
      res.send('something went wrong.');
   }
});

// --- TASKS ---
// get tasks from a project by id
app.get('/api/projects/:projectId/tasks', async (req, res) => {
   try {
   } catch (err) {
      console.log(err);
      res.send('something went wrong.');
   }
});

// updating task (now it replaces whole task). fix it to patch
app.put('/api/tasks/:taskId', async (req, res) => {
   try {
   } catch (err) {
      console.log(err);
      res.send('something went wrong.');
   }
});

// deleting task
app.delete('/api/tasks/:taskId', async (req, res) => {
   try {
   } catch (err) {
      console.log(err);
      res.send('something went wrong.');
   }
});

app.listen(port, () => {
   console.log(`server listening on port ${port}`);
});
