import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

import ThemeToggle from '../components/ThemeToggle';
import useNavigation from '../hooks/useNavigation';
import {ThemeColors} from '../utils/types';
import Loader from '../components/Loader';

type Props = {};

const Profile = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const {navigate} = useNavigation();
  const {colors} = useTheme();
  const styles = createStyles(colors);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  async function onLogoutPress() {
    try {
      await auth().signOut();
      navigate('Login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  if (!user) {
    return <Loader message="Loading user information..." />;
  }

  const InfoItem = ({icon, label, value, colors}: InfoItemProps) => (
    <View style={styles.infoItem}>
      <Icon
        name={icon}
        size={24}
        color={colors.primary}
        style={styles.infoIcon}
      />
      <View>
        <Text style={[styles.infoLabel, {color: colors.text}]}>{label}</Text>
        <Text style={[styles.infoValue, {color: colors.text}]}>{value}</Text>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{uri: user.photoURL || 'https://via.placeholder.com/150'}}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{user.displayName}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.infoContainer}>
        <InfoItem
          icon="verified-user"
          label="Email Verified"
          value={user.emailVerified ? 'Yes' : 'No'}
          colors={colors}
        />
        <InfoItem
          icon="fingerprint"
          label="User ID"
          value={user.uid.slice(0, 8) + '...'}
          colors={colors}
        />
        <InfoItem
          icon="perm-phone-msg"
          label="Phone Number"
          value="Not Available"
          colors={colors}
        />
        <InfoItem
          icon="phonelink-lock"
          label="Multifactor Enabled"
          value="Not Enabled"
          colors={colors}
        />
      </View>

      <View style={styles.actionsContainer}>
        <ThemeToggle />
        <TouchableOpacity style={styles.logoutButton} onPress={onLogoutPress}>
          <Icon name="logout" size={24} color={colors.background} />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

type InfoItemProps = {
  icon: string;
  label: string;
  value: string;
  colors: ThemeColors;
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 20,
    },
    header: {
      alignItems: 'center',
      marginBottom: 30,
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
      marginBottom: 15,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 5,
    },
    email: {
      fontSize: 16,
      color: colors.text,
      opacity: 0.8,
    },
    infoContainer: {
      marginBottom: 30,
    },
    infoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
    infoIcon: {
      marginRight: 15,
    },
    infoLabel: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 2,
    },
    infoValue: {
      fontSize: 14,
      opacity: 0.8,
    },
    actionsContainer: {
      marginTop: 'auto',
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary,
      paddingVertical: 12,
      borderRadius: 8,
      marginTop: 20,
    },
    logoutButtonText: {
      color: colors.background,
      fontSize: 18,
      fontWeight: '600',
      marginLeft: 10,
    },
    loadingText: {
      fontSize: 18,
      color: colors.text,
      textAlign: 'center',
    },
  });

export default Profile;
