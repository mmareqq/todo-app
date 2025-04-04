export function formatDuration(totalMinutes) {
   const hours = Math.floor(totalMinutes / 60);
   const minutes = totalMinutes % 60;
   if (totalMinutes === 0) return '0min';
   return (
      [hours ? `${hours}h` : '', minutes ? `${minutes}min` : '']
         .join(' ')
         .trim() || null
   );
}
