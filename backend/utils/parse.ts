export const parseId = (id: string) => {
   const numberId = Number(id);
   if (!Number.isInteger(numberId)) throw Error(`invalid id ${id}`);
   return numberId;
};
