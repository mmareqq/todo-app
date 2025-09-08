import { createContext } from 'react';
import type { SettingsContext } from '@frontend/data/types';

const SettingsContext = createContext<SettingsContext | null>(null);

export default SettingsContext;
