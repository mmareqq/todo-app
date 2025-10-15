import { z_Id } from '@types';
export const parseId = (id: string) => z_Id.parse(parseInt(id));
