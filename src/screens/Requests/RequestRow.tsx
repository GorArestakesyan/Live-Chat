/* eslint-disable react/react-in-jsx-scope */
import Thumbnail from '@components/Thumbnail';
import utils from '@core/utils';
import {TRequestUser} from '@src/core/types';
import {StyleSheet, Text, View} from 'react-native';
import Cell from '../../common/Cell';
import RequestAccept from './RequestAccept';

const RequestRow = ({item}: {item: TRequestUser}) => {
  const message = 'Requested to connect with you ';
  const time = utils.formatedData(item.created);

  return (
    <Cell>
      <Thumbnail path={item.sender.thumbnail} size={70} />
      <View style={styles.requestRowItem}>
        <Text style={styles.name}>{item.sender.name}</Text>
        <Text style={styles.username}>
          {message}
          <Text style={styles.time}>{time}</Text>
        </Text>
      </View>
      <RequestAccept item={item} />
    </Cell>
  );
};

export default RequestRow;

const styles = StyleSheet.create({
  requestRowItem: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 25,
  },
  name: {
    fontWeight: 'bold',
    color: '#202020',
    marginBottom: 4,
  },
  username: {
    color: '#606060',
  },
  time: {
    color: '#909090',
    fontSize: 13,
  },
});
