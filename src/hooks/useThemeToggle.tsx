// useThemeToggle.ts
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Theme} from '@react-navigation/native';
import {darkTheme, lightTheme} from '../utils/themes';

const THEME_KEY = 'app_theme';

const useThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>(lightTheme);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_KEY);
        if (savedTheme === 'dark') {
          setTheme(darkTheme);
        } else {
          setTheme(lightTheme);
        }
      } catch (error) {
        console.error('Failed to load theme', error);
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    try {
      const newTheme = theme === lightTheme ? darkTheme : lightTheme;
      setTheme(newTheme);

      await AsyncStorage.setItem(
        THEME_KEY,
        newTheme === lightTheme ? 'light' : 'dark',
      );
    } catch (error) {
      console.error('Failed to save theme', error);
    }
  };

  return {theme, toggleTheme};
};

export default useThemeToggle;
