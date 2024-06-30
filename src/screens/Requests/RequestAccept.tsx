import {IGlobalState} from '@src/core/types';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useGlobalState} from '../../core/global';

const RequestAccept = ({item}: any) => {
  const requestAccept = useGlobalState(
    (state: IGlobalState) => state.requestAccept,
  );

  return (
    <TouchableOpacity
      style={styles.acceptBtn}
      onPress={() => requestAccept(item.sender.username)}>
      <Text style={styles.acceptText}>Accept</Text>
    </TouchableOpacity>
  );
};

export default RequestAccept;

const styles = StyleSheet.create({
  acceptBtn: {
    backgroundColor: '#202020',
    paddingHorizontal: 14,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
