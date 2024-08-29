import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Splash from '../screens/Splash';
import Todos from '../screens/Todos';
import BottomTabs, {BottomTabParamList} from '../screens/BottomTabs';
import Login from '../screens/Login';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

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
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
};

export default MainNavigator;
