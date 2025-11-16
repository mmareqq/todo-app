import { MUTATIONS, QUERIES } from '../db/queries';
import type { Handler, HandlerEvent } from '@netlify/functions';
import getVerifiedUserId from 'backend/utils/getVerifiedUserId';

export const handler: Handler = async (event: HandlerEvent) => {
   try {
      if (event.httpMethod !== 'POST') {
         throw Error(`Method is not POST for: ${event.rawUrl}`);
      }

      const userId = await getVerifiedUserId(event.headers.authorization);
      const [rows]: any[] = await QUERIES.getUserInboxProject(userId);

      console.log(rows);
      if (rows.length !== 0) return { statusCode: 204 };

      // user doesnt have inbox project in db
      console.log('CREATING NEW USER', userId);
      await MUTATIONS.addProject({
         name: 'Inbox',
         type: 'preset',
         user_id: userId,
      });
      return { statusCode: 201 };
   } catch (err) {
      console.log(err);
      throw err;
   }
};
