import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';

type Props = {
  message?: string;
};

const Loader = ({message = 'Loading...'}: Props) => {
  const {colors} = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text
        style={{
          textAlign: 'center',
          paddingBottom: 10,
          color: colors.text,
        }}>
        {message}
      </Text>
    </View>
  );
};

export default Loader;
