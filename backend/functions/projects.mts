import MUTATIONS from 'backend/db/mutations';
import QUERIES from '../db/queries';
import { z_Project, z_ProjectCreate } from '@types';
import { array } from 'zod';
import type { Handler, HandlerEvent } from '@netlify/functions';
import getVerifiedUserId from 'backend/utils/getVerifiedUserId';

export const handler: Handler = async (event: HandlerEvent) => {
   try {
      const userId = await getVerifiedUserId(event.headers.authorization);
      if (event.httpMethod === 'GET') {
         const res = await getProjects(userId);
         return res;
      }

      if (event.httpMethod === 'POST') {
         if (!event.body) throw Error('no body for PATCH');
         const body = JSON.parse(event.body);
         const project = z_ProjectCreate.parse(body);

         await MUTATIONS.addProject({ ...project, user_id: userId });
         return { statusCode: 201 };
      }

      throw Error(`Method is not GET or POST for: ${event.rawUrl}`);
   } catch (err) {
      console.log(err);
      throw err;
   }
};

const getProjects = async (userId: string) => {
   const [rows] = await QUERIES.getProjectsFromUser(userId);
   const projects = array(z_Project).parse(rows);

   return {
      statusCode: 200,
      body: JSON.stringify(projects),
   };
};
