import {View, Text, StyleSheet, useColorScheme, Image} from 'react-native';
import React, {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
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

  // useEffect(() => {
  //   const checkAuthState = async () => {
  //     debugger;
  //     console.log('entered');
  //     try {
  //       const unsubscribe = await auth().onAuthStateChanged(user => {
  //         console.log('user', user);

  //         if (user) {
  //           // If the user is signed in, navigate to BottomTabs
  //           navigation.navigate('BottomTabs', {
  //             screen: 'Todos',
  //           });
  //         } else {
  //           // If the user is not signed in, navigate to Login
  //           navigation.navigate('Login');
  //         }
  //       });

  //       return () => unsubscribe(); // Clean up the listener on unmount
  //     } catch (error) {
  //       console.error('Error checking auth state:', error);
  //     }
  //   };

  //   checkAuthState();
  // }, []);

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
