import QUERIES from '../db/queries';
import MUTATIONS from 'backend/db/mutations';
import { array } from 'zod';
import { z_Note, z_NoteCreate } from '@types';
import type { Handler, HandlerEvent } from '@netlify/functions';
import getVerifiedUserId from 'backend/utils/getVerifiedUserId';

export const handler: Handler = async (event: HandlerEvent) => {
   try {
      const userId = await getVerifiedUserId(event.headers.authorization);
      if (event.httpMethod === 'GET') {
         const [rows] = await QUERIES.getNotes(userId);
         const notes = array(z_Note).parse(rows);
         return { statusCode: 200, body: JSON.stringify(notes) };
      }

      if (event.httpMethod === 'POST') {
         if (!event.body) throw Error('no body for POST');
         const body = JSON.parse(event.body);
         const note = z_NoteCreate.parse(body);
         await MUTATIONS.addNote({ ...note, user_id: userId });
         return { statusCode: 200 };
      }

      if (event.httpMethod === 'DELETE') {
         await MUTATIONS.deleteAllNotes();
         return { statusCode: 200 };
      }

      throw Error(
         `this url only accepts GET, POST or DELETE http methods. url: ${event.rawUrl}`,
      );
   } catch (err) {
      console.log(err);
      throw err;
   }
};
