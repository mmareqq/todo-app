import 'dotenv/config';
import express from 'express';
import { MUTATIONS, QUERIES } from './db/queries';
import z from 'zod';
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.get('/api/projects', async (req, res) => {
   try {
      const projects = await QUERIES.getAllProjects();
      res.status(200).json(projects);
   } catch (err) {
      console.log(err);
      res.send('something went wrong.');
   }
});

const ProjectCreateType = z.object({
   name: z.string(),
});

// add project
app.post('/api/projects', async (req, res) => {
   const projectParse = ProjectCreateType.safeParse(req.body);
   if (!projectParse.success) throw new Error();
   try {
      const metaData = await MUTATIONS.addProject(projectParse.data);
      res.status(201).json(metaData);
   } catch (err) {
      console.log(err);
      res.send('something went wrong.');
   }
});

// update project
app.patch('/api/projects/:projectId', async (req, res) => {
   const projectUpdates = req.body;
   try {
      const metaData = await MUTATIONS.updateProject(
         req.params.projectId,
         projectUpdates,
      );
      res.status(200).json(metaData);
   } catch (err) {
      console.log(err);
      res.send('something went wrong.');
   }
});
// delete project
app.delete('/api/projects/:projectId', async (req, res) => {
   try {
      const metaData = await MUTATIONS.deleteProject(req.params.projectId);
      res.status(200).json(metaData);
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

// add task
app.post('/api/projects/:projectId/tasks', async (req, res) => {
   try {
   } catch (err) {
      console.log(err);
      res.send('something went wrong.');
   }
});

// updating task
app.patch('/api/tasks/:taskId', async (req, res) => {
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

// --- NOTES ---

// get all notes
app.get('/api/notes', async (req, res) => {
   try {
   } catch (err) {
      console.log(err);
      res.send('something went wrong.');
   }
});

// add note
app.post('/api/notes/:noteId', async (req, res) => {
   try {
   } catch (err) {
      console.log(err);
      res.send('something went wrong.');
   }
});

// update note
app.patch('/api/notes/:noteId', async (req, res) => {
   try {
   } catch (err) {
      console.log(err);
      res.send('something went wrong.');
   }
});

// delete note
app.delete('/api/notes/:noteId', async (req, res) => {
   try {
   } catch (err) {
      console.log(err);
      res.send('something went wrong.');
   }
});
