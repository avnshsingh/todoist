import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Todos from '../screens/Todos';
import Profile from '../screens/Profile';

export type BottomTabParamList = {
  Todos: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabs = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Todos" component={Todos} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
