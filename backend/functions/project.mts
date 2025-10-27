import { QUERIES, MUTATIONS } from '../db/queries';
import { ProjectUpdate, z_Project, z_ProjectUpdate, Id } from '@types';
import { array } from 'zod';

import cleanUndefined from 'backend/utils/cleanUndefined';
import { getProjectParam } from '../utils/getParams';
const ENDPOINT_PATH = '/api/projects/:projectId';

import type { Handler, HandlerEvent } from '@netlify/functions';
export const handler: Handler = async (event: HandlerEvent) => {
   try {
      const projectId = getProjectParam(ENDPOINT_PATH, event.path);

      if (event.httpMethod === 'GET') {
         const res = await getProject(projectId);
         return res;
      }
      if (event.httpMethod === 'PATCH') {
         if (!event.body) throw new Error('no body for patch');
         const body = JSON.parse(event.body);
         const updates = cleanUndefined(z_ProjectUpdate.parse(body));
         await MUTATIONS.updateProject(projectId, updates);
         return { statusCode: 200 };
      }
      if (event.httpMethod === 'DELETE') {
         await MUTATIONS.deleteProject(projectId);
         return { statusCode: 200 };
      }

      throw Error(`Method is not GET, DELETE or PATCH for: ${event.rawUrl}`);
   } catch (err) {
      console.log(err);
      throw err;
   }
};

const getProject = async (projectId: Id) => {
   const [rows] = await QUERIES.getProject(projectId);
   const [project] = array(z_Project.omit({ type: true }))
      .parse(rows)
      .map(p => ({ ...p, type: 'custom' }));

   return {
      statusCode: 200,
      body: JSON.stringify(project),
   };
};
