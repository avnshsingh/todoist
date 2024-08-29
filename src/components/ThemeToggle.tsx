import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';
import {useThemeToggleContext} from '../context/ThemeProvider';

const ThemeToggle = () => {
  const {toggleTheme} = useThemeToggleContext();
  const {colors, dark} = useTheme();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={[styles.button, {backgroundColor: colors.card}]}>
      <Icon
        name={dark ? 'brightness-2' : 'wb-sunny'} // 'brightness-2' for dark, 'wb-sunny' for light
        size={24}
        color={colors.text}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
  },
});

export default ThemeToggle;
