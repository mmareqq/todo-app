import getFullUrl from '@frontend/utils/getFullUrl';
import type { RecursiveJson } from '@shared/data/types/helperTypes';
type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export const getFetchRequest = (
   url: string,
   method: Method,
   body?: RecursiveJson,
) => {
   if (method === 'GET' && body) {
      throw new Error('HTTP GET cannot have body');
   }
   if ((method === 'POST' || method === 'PATCH') && !body) {
      console.warn(`no body specified for HTTP ${method}`);
   }

   const headers = new Headers([['Content-Type', 'application/json']]);
   const request = new Request(getFullUrl(url), {
      method: method,
      headers,
      body: JSON.stringify(body),
   });
   return request;
};

export const fetchJSON = async (req: Request) => {
   try {
      const json = await fetch(req).then(res => {
         if (!res.ok) throw new Error(`HTTP ${res.status}`);
         return res.json();
      });
      return json;
   } catch (err) {
      console.error(err);
   }
};
