import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import useNavigation from '../hooks/useNavigation';

GoogleSignin.configure({
  webClientId:
    '911197543393-v6kfr2ta6rg1b4gdqifds8c4g3o17odt.apps.googleusercontent.com',
});

type Props = {};

const Login = (props: Props) => {
  const {navigate} = useNavigation();
  async function onGoogleButtonPress() {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      auth().signInWithCredential(googleCredential);

      navigate('BottomTabs', {screen: 'Todos'});
    } catch (error) {
      console.log('Error in google signin', Error);
    }
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <TouchableOpacity onPress={onGoogleButtonPress}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Google Sign in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
