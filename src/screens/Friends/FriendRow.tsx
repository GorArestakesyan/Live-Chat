import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Cell from '../../common/Cell';
import Thumbnail from '../../components/Thumbnail';
import utils from '../../core/utils';

const FriendRow = ({navigation, item}: any) => {
  const handleNavigate = () => navigation.navigate('Messages', item);
  return (
    <TouchableOpacity onPress={handleNavigate}>
      <Cell>
        <Thumbnail path={item.friend.thumbnail} size={70} />
        <View style={styles.requestRowItem}>
          <Text style={styles.name}>{item.friend.name}</Text>
          <View style={styles.nameAndInfoBox}>
            <Text style={styles.username}>{item.preview}</Text>
            <Text style={styles.time}>{utils.formatedData(item.updated)}</Text>
          </View>
        </View>
      </Cell>
    </TouchableOpacity>
  );
};

export default FriendRow;

const styles = StyleSheet.create({
  requestRowItem: {
    paddingHorizontal: 16,
    paddingVertical: 25,
  },
  nameAndInfoBox: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: 'bold',
    color: '#202020',
    marginBottom: 4,
  },
  username: {
    justifyContent: 'space-between',
    color: '#606060',
  },
  time: {
    color: '#909090',
    fontSize: 13,
  },
});
