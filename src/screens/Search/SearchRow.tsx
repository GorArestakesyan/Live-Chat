import {TSearchedUser} from '@src/core/types';
import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Cell from '../../common/Cell';
import Thumbnail from '../../components/Thumbnail';
import {ThemeContext} from '../navigation/Navigation';
import SearchButton from './SearchButton';

const SearchRow = ({user}: {user: TSearchedUser}) => {
  const {colors} = useContext(ThemeContext);
  return (
    <Cell>
      <Thumbnail path={user.thumbnail} size={76} />
      <View style={styles.nameWrapper}>
        <Text style={[styles.name, {color: colors.gray}]}>{user.name}</Text>
        <Text style={styles.username}>{user.username}</Text>
      </View>
      <SearchButton user={user} />
    </Cell>
  );
};

export default SearchRow;

const styles = StyleSheet.create({
  name: {
    fontWeight: 'bold',
    color: '#202020',
    marginBottom: 4,
  },
  username: {
    color: '#606060',
  },
  nameWrapper: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
