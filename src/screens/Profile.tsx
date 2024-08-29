import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import useThemeToggle from '../hooks/useThemeToggle';
import {useThemeToggleContext} from '../context/ThemeProvider';
import ThemeToggle from '../components/ThemeToggle';
import {useTheme} from '@react-navigation/native';

type Props = {};

const Profile = (props: Props) => {
  const {toggleTheme} = useThemeToggleContext();
  const {colors} = useTheme();

  return (
    <View>
      <Text style={{color: colors.text}}>Profile</Text>
      {/* <Button title="Toggle Theme" onPress={toggleTheme} /> */}
      <ThemeToggle />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
