import { compareStrings } from './stringUtils';
export const getToday = () => {
   const date = new Date();
   const day = date.getDate().toString().padStart(2, '0');
   const month = (date.getMonth() + 1).toString().padStart(2, '0');
   const year = date.getFullYear();

   return `${year}-${month}-${day}`;
};

export const compareDates = (date1: string, date2: string) => {
   // -1 - after, 0 - equal, 1 - before
   return compareStrings(date1, date2);
};

export const formatDuration = (totalMinutes: number): string => {
   const hours = Math.floor(totalMinutes / 60);
   const minutes = totalMinutes % 60;
   return [hours ? `${hours}h` : '', minutes ? `${minutes}min` : '']
      .join(' ')
      .trim();
};

export function formatDate(date: string) {
   const [year, month, day] = date.split('-');
   return `${day}.${month}.${year}`;
}
