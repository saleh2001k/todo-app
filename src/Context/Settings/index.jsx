import React from "react";

export const SettingsContext = React.createContext();
export default function SettingsProvider(props) {
  const defaultSettings = {
    displayItems: 3,
    hideCompleted: true,
    sortWord: "difficulty",
  };

  return (
    <SettingsContext.Provider value={defaultSettings}>
      {props.children}
    </SettingsContext.Provider>
  );
}
