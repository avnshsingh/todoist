import {View, Text, StyleSheet, useColorScheme, Image} from 'react-native';
import React, {useEffect} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import useNavigation from '../hooks/useNavigation';

const Splash = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const {navigate} = useNavigation();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    setTimeout(() => {
      navigate('AuthLoadingScreen');
    }, 1500);
  }, []);

  return (
    <View style={[style.container, backgroundStyle]}>
      <Image source={require('../images/logo.png')} style={style.logo} />
    </View>
  );
};

export default Splash;

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '50%',
    height: '30%',
  },
});
