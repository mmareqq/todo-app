export function formatDuration(totalMinutes: number): string | null {
   const hours = Math.floor(totalMinutes / 60);
   const minutes = totalMinutes % 60;
   if (totalMinutes === 0) return null;
   return [hours ? `${hours}h` : '', minutes ? `${minutes}min` : '']
      .join(' ')
      .trim();
}

export function formatDate(date: string) {
   const [year, month, day] = date.split('-');
   return `${day}.${month}.${year}`;
}
