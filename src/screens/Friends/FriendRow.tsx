import Thumbnail from '@components/Thumbnail';
import utils from '@core/utils';
import {ThemeContext} from '@screens/navigation/Navigation';
import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Cell from '../../common/Cell';

const FriendRow = ({navigation, item}: any) => {
  const handleNavigate = () => navigation.navigate('Messages', item);
  const {colors} = useContext(ThemeContext);

  return (
    <TouchableOpacity onPress={handleNavigate}>
      <Cell>
        <Thumbnail path={item.friend.thumbnail} size={70} />
        <View style={styles.requestRowItem}>
          <Text style={[styles.name, {color: colors.name}]}>
            {item.friend.name}
          </Text>
          <View style={styles.nameAndInfoBox}>
            <Text style={[styles.username, {color: colors.darkGraySecondary}]}>
              {item.preview}
            </Text>
            <Text style={[styles.time, {color: colors.name}]}>
              {utils.formatedData(item.updated)}
            </Text>
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
    marginBottom: 4,
  },
  username: {
    justifyContent: 'space-between',
  },
  time: {
    fontSize: 13,
  },
});
