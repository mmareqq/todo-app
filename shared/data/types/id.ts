import z from 'zod';

const z_Id = z.number();

type Id = z.infer<typeof z_Id>;

export { z_Id, Id };
