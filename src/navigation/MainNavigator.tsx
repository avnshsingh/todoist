import {View, Text, useColorScheme, Button} from 'react-native';
import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Splash from '../screens/Splash';
import Todos from '../screens/Todos';
import BottomTabs, {BottomTabParamList} from '../screens/BottomTabs';
import Login from '../screens/Login';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import {darkTheme, lightTheme} from '../utils/themes';
import useThemeToggle from '../hooks/useThemeToggle';
import ThemeProvider from '../context/ThemeProvider';

export type RootStackParamList = {
  Splash: undefined;
  AuthLoadingScreen: undefined;
  Login: undefined;
  BottomTabs: {
    screen: keyof BottomTabParamList;
    params?: BottomTabParamList[keyof BottomTabParamList];
  };
};

const Stack = createStackNavigator<RootStackParamList>();
const MainNavigator = () => {
  // const isDarkMode = useColorScheme() === 'dark';
  // const theme = isDarkMode ? darkTheme : lightTheme;
  // // const theme = lightTheme;

  const {theme, toggleTheme} = useThemeToggle();

  console.log('theme', theme);

  useEffect(() => {
    toggleTheme();
    console.log('theme2', theme);
  }, []);
  return (
    <>
      <ThemeProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AuthLoadingScreen"
            component={AuthLoadingScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="BottomTabs"
            component={BottomTabs}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </ThemeProvider>
    </>
  );
};

export default MainNavigator;
