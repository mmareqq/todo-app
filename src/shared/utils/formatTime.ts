export function formatDuration(totalMinutes: number): string | null {
   const hours = Math.floor(totalMinutes / 60);
   const minutes = totalMinutes % 60;
   if (totalMinutes === 0) return '0min';
   return (
      [hours ? `${hours}h` : '', minutes ? `${minutes}min` : '']
         .join(' ')
         .trim() || null
   );
}

export function formatDate(date: string): string {
   const [year, month, day] = date.split('-');
   return `${day}.${month}.${year}`;
}
