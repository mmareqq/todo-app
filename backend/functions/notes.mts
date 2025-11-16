import { QUERIES, MUTATIONS } from '../db/queries';
import { array } from 'zod';
import { z_Note, z_NoteCreate } from '@types';
import type { Handler, HandlerEvent } from '@netlify/functions';
export const handler: Handler = async (event: HandlerEvent) => {
   try {
      if (event.httpMethod === 'GET') {
         const [rows] = await QUERIES.getNotes();
         const notes = array(z_Note).parse(rows);
         return { statusCode: 200, body: JSON.stringify(notes) };
      }

      if (event.httpMethod === 'POST') {
         if (!event.body) throw Error('no body for POST');
         const body = JSON.parse(event.body);
         const note = z_NoteCreate.parse(body);
         await MUTATIONS.addNote(note);
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
