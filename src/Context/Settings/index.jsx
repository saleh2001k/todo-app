import React, { useEffect, useReducer } from 'react';
import { stateReducer, initialState } from '../../hooks/Reducer/reducer';

export const SettingContext = React.createContext();

function Settings({ children }) {
  const [settings, dispatch] = useReducer(
    stateReducer,
    initialState,
    (initialData) => {
      const localData = localStorage.getItem('settings');
      return localData ? JSON.parse(localData) : initialData;
    }
  );

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  const contextValue = { settings, dispatch };

  return (
    <SettingContext.Provider value={contextValue}>
      {children}
    </SettingContext.Provider>
  );
}

export default Settings;
