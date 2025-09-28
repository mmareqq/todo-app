import express from 'express';
import { MUTATIONS, QUERIES } from './db/queries';
import { safeParseId } from './utils/safeParse';
import z from 'zod';
import { formatDate } from '@shared/data/utils/formatDate';

import cleanUndefined from './utils/cleanUndefined';
import env from './utils/envSchema';
import cors from 'cors';

import * as t from '@types';

const port = env.PORT || 3000;
const app = express();
app.use(express.json());

app.use(
   cors({
      origin: 'http://localhost:5173',
   }),
);

app.get('/api/projects', async (req, res) => {
   try {
      const [rows] = await QUERIES.getAllProjects();

      const projects = z
         .array(t.z_Project.omit({ type: true }))
         .parse(rows)
         .map(p => ({ ...p, type: 'custom' }));
      res.status(200).json(projects);
   } catch (err) {
      console.log(err);
      res.send('something went wrong.');
   }
});

app.get('/api/projects/:projectId', async (req, res) => {
   try {
      const projectId = safeParseId(req.params.projectId);
      const [rows] = await QUERIES.getProject(projectId);
      console.log('project', rows);
      const [project] = z
         .array(t.z_Project.omit({ type: true }))
         .parse(rows)
         .map(p => ({ ...p, type: 'custom' }));
      res.status(200).json({ ...project });
   } catch (err) {
      console.log(err);
      res.send('something went wrong.');
   }
});

app.post('/api/projects', async (req, res) => {
   try {
      const projectData = t.z_ProjectCreate.parse(req.body);
      const [result] = await MUTATIONS.addProject(projectData);
      console.log(result);
      res.status(200).json(result);
   } catch (err) {
      console.log(err);
      res.send('something went wrong.');
   }
});

app.patch('/api/projects/:projectId', async (req, res) => {
   try {
      const projectId = safeParseId(req.params.projectId);
      const projectUpdates = cleanUndefined(t.z_ProjectUpdate.parse(req.body));
      const [result] = await MUTATIONS.updateProject(projectId, projectUpdates);
      res.status(200).json(result);
   } catch (err) {
      console.log(err);
      res.send('something went wrong.');
   }
});

app.delete('/api/projects/:projectId', async (req, res) => {
   try {
      const projectId = safeParseId(req.params.projectId);
      const [result] = await MUTATIONS.deleteProject(projectId);
      res.status(200).json(result);
   } catch (err) {
      console.log(err);
      res.send('something went wrong.');
   }
});

// TASKS
app.get('/api/tasks', async (req, res) => {
   try {
      const [rows] = await QUERIES.getTasksWithDate();
      const tasks = z.array(t.z_Task).parse(rows);
      res.status(200).json(tasks);
   } catch (err) {
      console.log(err);
      res.send('something went wrong.');
   }
});

app.get('/api/projects/:projectId/tasks', async (req, res) => {
   try {
      const projectId = safeParseId(req.params.projectId);
      const [rows] = await QUERIES.getTasksByProjectId(projectId);
      const tasks = z.array(t.z_Task).parse(rows);
      res.status(200).json(tasks);
   } catch (err) {
      console.log(err);
      res.send('something went wrong.');
   }
});

app.get('/api/tasks/today', async (req, res) => {
   try {
      const today = formatDate(new Date());
      const [rows] = await QUERIES.getTasksFromDate(today);
      const tasks = z.array(t.z_Task).parse(rows);
      res.status(200).json(tasks);
   } catch (err) {
      console.log(err);
      res.send('something went wrong.');
   }
});

app.post('/api/tasks', async (req, res) => {
   try {
      const task = t.z_TaskCreate.parse(req.body);
      const [result] = await MUTATIONS.addTask(task);
      res.status(200).json(result);
   } catch (err) {
      console.log('err', err);
      res.send('something went wrong');
   }
});

app.patch('/api/tasks/:taskId', async (req, res) => {
   try {
      const taskId = safeParseId(req.params.taskId);
      const taskUpdates = cleanUndefined(t.z_TaskUpdate.parse(req.body));

      const [result] = await MUTATIONS.updateTask(taskId, taskUpdates);
      res.status(200).json(result);
   } catch (err) {
      console.log(err);
      res.send('something went wrong.');
   }
});

app.delete('/api/tasks/:taskId', async (req, res) => {
   try {
      const taskId = safeParseId(req.params.taskId);
      const [result] = await MUTATIONS.deleteTask(taskId);
      res.status(200).json(result);
   } catch (err) {
      console.log(err);
      res.send('something went wrong.');
   }
});

// NOTES
app.get('/api/notes', async (req, res) => {
   try {
      const [rows] = await QUERIES.getNotes();
      const notes = z.array(t.z_Note).parse(rows);
      res.status(200).json(notes);
   } catch (err) {
      console.log(err);
      res.send('something went wrong.');
   }
});

app.post('/api/notes', async (req, res) => {
   try {
      const note = t.z_NoteCreate.parse(req.body);
      const [result] = await MUTATIONS.addNote(note);
      res.status(200).json(result);
   } catch (err) {
      console.log(err);
      res.send('something went wrong.');
   }
});

app.patch('/api/notes/:noteId', async (req, res) => {
   try {
      const noteId = safeParseId(req.params.noteId);
      const noteUpdates = cleanUndefined(t.z_NoteUpdate.parse(req.body));
      const [result] = await MUTATIONS.updateNote(noteId, noteUpdates);
      res.status(200).json(result);
   } catch (err) {
      console.log(err);
      res.send('something went wrong.');
   }
});

app.delete('/api/notes/:noteId', async (req, res) => {
   try {
      const noteId = safeParseId(req.params.noteId);
      const [result] = await MUTATIONS.deleteNote(noteId);
      res.status(200).json(result);
   } catch (err) {
      console.log(err);
      res.send('something went wrong.');
   }
});

app.listen('3000', () => {
   console.log(`server listening on port ${port}`);
});
