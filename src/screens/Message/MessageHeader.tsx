import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Thumbnail from '../../components/Thumbnail';

const MessageHeader = ({friend}: any) => {
  return (
    <View style={styles.headerContainer}>
      <Thumbnail path={friend.thumbnail} size={30} />
      <Text style={styles.name}>{friend.name}</Text>
    </View>
  );
};

export default MessageHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    justifyContent: 'space-around',
  },
  name: {
    color: '#202020',
    fontWeight: 'bold',
    fontSize: 18,
  },
  fakeBox: {
    width: '30%',
  },
});
