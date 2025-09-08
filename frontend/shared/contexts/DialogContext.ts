import { createContext } from 'react';
import type { Dialog } from '@frontend/data/types';

const DialogContext = createContext<Dialog | null>(null);
export default DialogContext;
