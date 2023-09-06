import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const defaultSettings = {
    displayItems: 3,
    hideCompleted: true,
    sortField: 'difficulty',
  };

  const [settings, setSettings] = useState(() => {
    const savedSettings = JSON.parse(localStorage.getItem('settings'));
    return savedSettings ? savedSettings : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings) => {
    setSettings(newSettings);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
