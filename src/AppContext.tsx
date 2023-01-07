import React, { useContext, useState } from 'react';

interface AppContextType {
  darkMode: boolean;
  // eslint-disable-next-line no-unused-vars
  changeTheme: (value: boolean) => void;
}

export const AppContext = React.createContext<AppContextType>({
  darkMode: false,
  changeTheme: () => null
});

interface Props {
  children: JSX.Element;
}

export const AppContextProvider = ({ children }: Props) => {
  const themes = localStorage.getItem('themes') || 'light';
  const checked = themes == 'dark' ? true : false;

  const [darkMode, setDarkMode] = useState<boolean>(checked);

  const changeTheme = (value: boolean) => {
    localStorage.setItem('themes', value ? 'dark' : 'light');
    setDarkMode(value);
  };

  const value: AppContextType = {
    darkMode: darkMode,
    changeTheme
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
