import { MUTATIONS, QUERIES } from '../db/queries';
import { z_Project, ProjectCreate, z_ProjectCreate } from '@types';
import { array } from 'zod';

import type { Handler, HandlerEvent } from '@netlify/functions';
export const handler: Handler = async (event: HandlerEvent) => {
   try {
      if (event.httpMethod === 'GET') {
         const res = await getProjects();
         return res;
      }
      if (event.httpMethod === 'POST') {
         const project = z_ProjectCreate.parse(event.body);
         const res = await addProject(project);
         return res;
      }

      throw Error(`Method is not GET or POST for: ${event.rawUrl}`);
   } catch (err) {
      console.log(err);
      throw err;
   }
};

const getProjects = async () => {
   const [rows] = await QUERIES.getAllProjects();
   const projects = array(z_Project.omit({ type: true }))
      .parse(rows)
      .map(p => ({ ...p, type: 'custom' }));
   return {
      statusCode: 200,
      body: JSON.stringify(projects),
   };
};

const addProject = async (project: ProjectCreate) => {
   await MUTATIONS.addProject(project);
   return { statusCode: 201 };
};
