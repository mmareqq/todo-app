import { useState, useEffect } from 'react';
import SettingsContext from './SettingsContext';
import { initialSettings } from '@data/data';

const SettingsProvider = ({ children }) => {
   const settings = useSettings();
   return (
      <SettingsContext.Provider value={settings}>
         {children}
      </SettingsContext.Provider>
   );
};

const getSettings = () => {
   return JSON.parse(localStorage.getItem('settings')) || initialSettings;
};

const useSettings = () => {
   const [settings, setSettings] = useState(getSettings);

   useEffect(() => {
      localStorage.setItem('settings', JSON.stringify(settings));
   }, [settings]);

   const updateSetting = (settingName, value) =>
      setSettings(prevSettings => {
         return { ...prevSettings, [settingName]: value };
      });

   return { settings, updateSetting };
};

export default SettingsProvider;
