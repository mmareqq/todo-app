export const parseId = (id: string) => {
   const numberId = Number(id);
   if (!Number.isInteger(numberId)) throw new Error(`invalid id ${id}`);
   return numberId;
};
