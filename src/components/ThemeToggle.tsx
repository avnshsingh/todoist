import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';
import {useThemeToggleContext} from '../context/ThemeProvider';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const ThemeToggle = () => {
  const {toggleTheme} = useThemeToggleContext();
  const {colors, dark} = useTheme();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={[styles.button, {backgroundColor: colors.card}]}>
      <Icon
        name={dark ? 'brightness-2' : 'wb-sunny'}
        size={24}
        color={colors.text}
      />
      <Text style={[{color: colors.text}]}>Toggle Theme</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
  },
});

export default ThemeToggle;
