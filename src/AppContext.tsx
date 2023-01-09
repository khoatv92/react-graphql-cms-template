/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';

interface AppContextType {
  darkMode: boolean;
  changeTheme: (value: boolean) => void;
  setUserInfo: (value: string) => void;
  userName: string;
}

export const AppContext = React.createContext<AppContextType>({
  darkMode: false,
  userName: '',
  changeTheme: () => null,
  setUserInfo: () => null
});

interface Props {
  children: JSX.Element;
}

export const AppContextProvider = ({ children }: Props) => {
  const themes = localStorage.getItem('themes') || 'light';
  const checked = themes == 'dark' ? true : false;

  const [darkMode, setDarkMode] = useState<boolean>(checked);
  const [userName, setUserName] = useState<string>(
    localStorage.getItem('userName') || ''
  );

  const changeTheme = (value: boolean) => {
    localStorage.setItem('themes', value ? 'dark' : 'light');
    setDarkMode(value);
  };

  const setUserInfo = (value: string) => {
    localStorage.setItem('userName', value);
    setUserName(value);
  };

  const value: AppContextType = {
    darkMode: darkMode,
    changeTheme,
    userName,
    setUserInfo
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
