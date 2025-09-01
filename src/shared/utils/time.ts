import { compareStrings } from './stringUtils';

const DAY_MINUTES = 24 * 60;
const DAY_SECONDS = DAY_MINUTES * 60;
const DAY_MS = DAY_SECONDS * 1000;

export const getToday = () => convertDateToStr(new Date());

export const getDatesMap = (length = 365) => {
   const dates = new Map<string, unknown[]>();
   const today = getToday();
   for (let i = 0; i < length; i++) {
      const currDate = addDaysToDate(today, i);
      dates.set(currDate, []);
   }

   return dates;
};

const addDaysToDate = (date: string, days: number) => {
   const daysMS = DAY_MS * days;
   const newDate = new Date(new Date(date).getTime() + daysMS);
   return convertDateToStr(newDate);
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
   return `${year}-${month}-${day}`; // 2025-05-25
};

export const compareDates = (date1: string, date2: string) => {
   return compareStrings(date1, date2); // -1 - after, 0 - equal, 1 - before
};

export const formatDuration = (totalMinutes: number): string => {
   const hours = Math.floor(totalMinutes / 60);
   const minutes = totalMinutes % 60;
   return [hours ? `${hours}h` : '', minutes ? `${minutes}min` : '']
      .join(' ')
      .trim();
   // 3h 45min
};

export const formatDate = (date: string) => {
   const [year, month, day] = date.split('-');
   return `${day}.${month}.${year}`; // 15.05.2025
};
