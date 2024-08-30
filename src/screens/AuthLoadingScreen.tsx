import React, {useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import auth from '@react-native-firebase/auth';
import useNavigation from '../hooks/useNavigation';

const AuthLoadingScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkAuthStatus = async () => {
      const user = auth().currentUser;

      if (user) {
        navigation.navigate('BottomTabs', {screen: 'Todos'});
      } else {
        navigation.navigate('Login');
      }
    };

    checkAuthStatus();
  }, [navigation]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default AuthLoadingScreen;
