import {
  View,
  Text,
  useColorScheme,
  Button,
  Platform,
  AppStateStatus,
} from 'react-native';
import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabs, {BottomTabParamList} from '../screens/BottomTabs';
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
} from '@tanstack/react-query';
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import useThemeToggle from '../hooks/useThemeToggle';
import ThemeProvider from '../context/ThemeProvider';
import {useOnlineManager} from '../hooks/useOnlineManager';
import {useAppState} from '../hooks/useAppState';

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

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

const queryClient = new QueryClient({
  defaultOptions: {queries: {retry: 2}},
});

const MainNavigator = () => {
  const {theme, toggleTheme} = useThemeToggle();
  useOnlineManager();
  useAppState(onAppStateChange);

  return (
    <>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </>
  );
};

export default MainNavigator;
