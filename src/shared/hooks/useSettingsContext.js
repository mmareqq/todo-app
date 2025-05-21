import { useContext } from 'react';
import SettingsContext from '@contexts/SettingsContext';

const useSettingsContext = () => {
   return useContext(SettingsContext);
};

export default useSettingsContext;
