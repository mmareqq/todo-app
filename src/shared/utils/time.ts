import { compareStrings } from './stringUtils';

const DAY_MINUTES = 24 * 60;
const DAY_SECONDS = DAY_MINUTES * 60;
const DAY_MS = DAY_SECONDS * 1000;

export const getToday = () => {
   const date = new Date();
   return convertDateToStr(date);
};

export const getDatesMap = (length = 365) => {
   const dates = new Map<string, any[]>();
   let currDay = getToday();
   while (length > 0) {
      dates.set(currDay, []);
      currDay = getNextDay(currDay);
      length -= 1;
   }
   return dates;
};

const getNextDay = (date: string) => {
   const nextDayDate = new Date(new Date(date).getTime() + DAY_MS);
   return convertDateToStr(nextDayDate);
};

export const getDayOfWeek = (date: string) => {
   const dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
   ];
   const dateDay = new Date(date).getDay();
   return dayNames[dateDay];
};

const convertDateToStr = (date: Date) => {
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
