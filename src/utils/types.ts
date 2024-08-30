import {Theme} from '@react-navigation/native';

export type ThemeColors = Theme['colors'];

export type TodoItem = {
  id: string;
  title: string;
  done: boolean;
};
