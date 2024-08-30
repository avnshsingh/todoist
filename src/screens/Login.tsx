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
import {Theme, useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

GoogleSignin.configure({
  webClientId:
    '911197543393-v6kfr2ta6rg1b4gdqifds8c4g3o17odt.apps.googleusercontent.com',
});

type Props = {};

const Login = (props: Props) => {
  const {navigate} = useNavigation();

  const {colors} = useTheme();
  const styles = createStyles(colors);

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
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>Sign in to continue</Text>
      <TouchableOpacity
        style={styles.googleButton}
        onPress={onGoogleButtonPress}>
        <Icon
          name="google"
          size={20}
          color={colors.text}
          style={styles.googleIcon}
        />
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

type ThemeColors = Theme['colors'];

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
      padding: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      color: colors.text,
      marginBottom: 30,
    },
    googleButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 24,
      elevation: 3,
    },
    googleIcon: {
      marginRight: 10,
    },
    googleButtonText: {
      color: colors.text,
      fontWeight: '600',
      fontSize: 16,
    },
  });
