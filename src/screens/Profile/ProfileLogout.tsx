import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useGlobalState} from '../../core/global';

const ProfileLogout = () => {
  const logout = useGlobalState(state => state.logout);
  return (
    <TouchableOpacity style={styles.btn} onPress={logout}>
      <FontAwesomeIcon
        icon={'right-from-bracket'}
        size={20}
        color="#d0d0d0"
        style={styles.icon}
      />
      <Text style={styles.btnText}>Log out</Text>
    </TouchableOpacity>
  );
};

export default ProfileLogout;

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    height: 52,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
    backgroundColor: '#202020',
    marginTop: 50,
  },
  btnText: {
    fontWeight: 'bold',
    color: '#d0d0d0',
  },
  icon: {
    marginRight: 12,
  },
});
