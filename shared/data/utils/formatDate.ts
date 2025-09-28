export const formatDate = (date: Date) => {
   const day = date.getDate().toString().padStart(2, '0');
   const month = (date.getMonth() + 1).toString().padStart(2, '0');
   const year = date.getFullYear();
   return `${year}-${month}-${day}`; // 2025-05-25
};
