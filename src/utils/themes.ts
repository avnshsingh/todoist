import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
  Theme,
} from '@react-navigation/native';

export const lightTheme: Theme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    background: '#ffffff',
    text: '#000000',
    primary: '#1e90ff',
    card: '#f8f9fa',
  },
};

export const darkTheme: Theme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    background: '#000000',
    text: '#ffffff',
    primary: '#ff6347',
    card: '#1e1e1e',
  },
};
