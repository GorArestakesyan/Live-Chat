import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useGlobalState} from '../../core/global';
import ProfileImage from './ProfileImage';
import ProfileLogout from './ProfileLogout';

const ProfileScreen = () => {
  const user = useGlobalState((state: any) => state.user);
  return (
    <View style={styles.profileContainer}>
      <ProfileImage />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.nick}>@{user.username}</Text>
      <ProfileLogout />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 100,
  },

  name: {
    textAlign: 'center',
    color: '#303030',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
  },
  nick: {
    textAlign: 'center',
    color: '#606060',
    fontSize: 14,

    marginTop: 10,
  },
});
