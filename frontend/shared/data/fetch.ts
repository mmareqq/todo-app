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
   if (method !== 'GET' && !body) {
      console.warn('no body specified and method is not GET');
   }

   const headers = new Headers([['Content-Type', 'application/json']]);
   const request = new Request(getFullUrl(url), {
      method: method,
      headers,
      body: JSON.stringify(body),
   });
   return request;
};
