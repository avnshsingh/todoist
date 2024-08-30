import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Todos from '../screens/Todos';
import Profile from '../screens/Profile';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useRoute} from '@react-navigation/native';

export type BottomTabParamList = {
  Todos: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabs = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Todos"
        component={Todos}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({color, size}) => (
            <FontAwesome5Icon name="tasks" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
