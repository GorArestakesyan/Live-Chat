import {useGlobalState} from '@core/global';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {IGlobalState} from '@src/core/types';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const ProfileLogout = () => {
  const logout = useGlobalState((state: IGlobalState) => state.logout);
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
