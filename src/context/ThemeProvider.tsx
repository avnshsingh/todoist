// ThemeProvider.tsx
import React, {createContext, useContext} from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import useThemeToggle from '../hooks/useThemeToggle';

const ThemeToggleContext = createContext({
  theme: DefaultTheme,
  toggleTheme: () => {},
});

export const useThemeToggleContext = () => useContext(ThemeToggleContext);

type ThemeProviderProps = {
  children: React.ReactNode;
};
const ThemeProvider = ({children}: ThemeProviderProps) => {
  const {theme, toggleTheme} = useThemeToggle();

  return (
    <ThemeToggleContext.Provider value={{theme, toggleTheme}}>
      <NavigationContainer theme={theme}>{children}</NavigationContainer>
    </ThemeToggleContext.Provider>
  );
};

export default ThemeProvider;
