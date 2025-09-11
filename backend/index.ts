import express from 'express';
import { MUTATIONS, QUERIES } from './db/queries';
import { safeParseBody, safeParseId } from './utils/safeParse';
import cleanUndefined from './utils/cleanUndefined';
import env from './utils/envSchema';
import {
   z_ProjectCreate,
   z_TaskCreate,
   z_NoteCreate,
   z_ProjectUpdate,
   z_TaskUpdate,
   z_NoteUpdate,
} from '@types';

const port = env.PORT || 3000;
const app = express();
app.use(express.json());

// curl -X GET http://localhost:3000/api/projects -H "Content-Type: application/json"
app.get('/api/projects', async (req, res) => {
   try {
      const [projects] = await QUERIES.getAllProjects();
      res.status(200).json(projects);
      return projects;
   } catch (err) {
      console.log(err);
      res.send('something went wrong.');
   }
});

// curl -X POST http://localhost:3000/api/projects  -d "{""name"":""New curl Project""}"" -H "Content-Type: application/json"
app.post('/api/projects', async (req, res) => {
   try {
      console.log('body', req.body);
      const projectData = safeParseBody(z_ProjectCreate, req.body);
      const [result] = await MUTATIONS.addProject(projectData);
      res.status(201).json(result);
   } catch (err) {
      console.log(err);
      res.send('something went wrong.');
   }
});

// curl -X PATCH http://localhost:3000/api/projects/1125899906842628  -d '{"name":"Curl project edited"}' -H "Content-Type: application/json"
app.patch('/api/projects/:projectId', async (req, res) => {
   try {
      const projectId = safeParseId(req.params.projectId);
      const projectUpdates = cleanUndefined(
         safeParseBody(z_ProjectUpdate, req.body),
      );
      const [result] = await MUTATIONS.updateProject(projectId, projectUpdates);
      res.status(200).json(result);
   } catch (err) {
      console.log(err);
      res.send('something went wrong.');
   }
});

// curl -X DELETE http://localhost:3000/api/projects/2251799813685250
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

// tasks
// curl -X GET http://localhost:3000/api/projects/1125899906842628/tasks
app.get('/api/projects/:projectId/tasks', async (req, res) => {
   try {
      console.log(req.params.projectId);
      const projectId = safeParseId(req.params.projectId);
      const [tasks] = await QUERIES.getTasksByProjectId(projectId);
      res.status(200).json(tasks);
      return tasks;
   } catch (err) {
      console.log(err);
      res.send('something went wrong.');
   }
});

// curl -X POST http://localhost:3000/api/tasks -H "Content-Type: application/json" -d "{""name"": ""Test task"", ""projectId"": 1125899906842628, ""completed"": false, ""priority"": ""none"", ""duration"": 45, ""dueDate"": ""2025-09-11""}"

app.post('/api/tasks', async (req, res) => {
   try {
      console.log('body', req.body);
      const task = safeParseBody(z_TaskCreate, req.body);
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
      const taskUpdates = cleanUndefined(safeParseBody(z_TaskUpdate, req.body));

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

// notes
app.get('/api/notes', async (req, res) => {
   try {
      const [notes] = await QUERIES.getNotes();
      res.status(200).json(notes);
      return notes;
   } catch (err) {
      console.log(err);
      res.send('something went wrong.');
   }
});

app.post('/api/notes', async (req, res) => {
   try {
      const note = safeParseBody(z_NoteCreate, req.body);
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
      const noteUpdates = cleanUndefined(safeParseBody(z_NoteUpdate, req.body));
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

app.listen(port, () => {
   console.log(`server listening on port ${port}`);
});
