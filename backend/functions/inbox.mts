import MUTATIONS from 'backend/db/mutations';
import QUERIES from '../db/queries';
import type { Handler, HandlerEvent } from '@netlify/functions';
import { z_Project } from '@types';
import getVerifiedUserId from 'backend/utils/getVerifiedUserId';

export const handler: Handler = async (event: HandlerEvent) => {
   try {
      const userId = await getVerifiedUserId(event.headers.authorization);
      if (event.httpMethod !== 'POST') {
         throw Error(`Method is not POST for: ${event.rawUrl}`);
      }

      const [rows]: [any, any] = await QUERIES.getUserInboxProject(userId);
      if (rows.length === 0) {
         await MUTATIONS.addProject({
            name: 'Inbox',
            type: 'preset',
            user_id: userId,
         });
      }
      const res = await getProject(userId);
      return res;
   } catch (err) {
      console.log(err);
      throw err;
   }
};

const getProject = async (userId: string) => {
   const [rows]: [any, any] = await QUERIES.getUserInboxProject(userId);
   if (rows.length !== 1) {
      throw new Error('Only 1 inbox per user allowed in DB');
   }
   const project = z_Project.parse(rows[0]);

   return {
      statusCode: 200,
      body: JSON.stringify(project),
   };
};
