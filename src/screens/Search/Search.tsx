/* eslint-disable react/no-unstable-nested-components */
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {IGlobalState} from '@src/core/types';
import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {FlatList, StyleSheet, TextInput, View} from 'react-native';
import Back from '../../components/Back';
import Empty from '../../components/Empty';
import {ThemeContainer} from '../../components/ThemeContainer';
import {useGlobalState} from '../../core/global';
import {ThemeContext} from '../navigation/Navigation';
import SearchRow from './SearchRow';

const SearchScreen = ({navigation}: any) => {
  const [query, setQuery] = useState('');
  const {searchUsers, searchList} = useGlobalState(
    (state: IGlobalState) => state,
  );
  const {colors} = useContext(ThemeContext);

  useEffect(() => {
    searchUsers(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: colors.background,
      },
      headerLeft: () => (
        <Back
          size={40}
          color={colors.back}
          onPress={() => navigation.goBack()}
        />
      ),
    });
  });
  return (
    <ThemeContainer>
      <View style={styles.searchContainer}>
        <TextInput
          style={[
            styles.input,
            {backgroundColor: colors.lightGray, color: colors.primaryText},
          ]}
          value={query}
          onChangeText={e => setQuery(e)}
          placeholder="Search..."
          placeholderTextColor={'#b0b0b0'}
        />
        <FontAwesomeIcon
          icon={'magnifying-glass'}
          size={18}
          color="#505050"
          style={styles.searchIcon}
        />
      </View>
      {searchList === null ? (
        <></>
      ) : !searchList?.length ? (
        <Empty
          icon="magnifying-glass"
          message={`No users found for "${query}" `}
        />
      ) : (
        <FlatList
          data={searchList}
          keyExtractor={item => item.username}
          renderItem={({item}) => <SearchRow user={item} />}
        />
      )}
    </ThemeContainer>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  searchContainer: {
    padding: 15,
    borderBottomWidth: 0.2,
    borderColor: '#f0f0f0',
  },
  input: {
    backgroundColor: '#e1e2e4',
    height: 42,
    borderRadius: 26,
    padding: 15,
    fontSize: 15,
    paddingLeft: 50,
  },
  searchIcon: {
    position: 'absolute',
    left: 28,
    top: '62%',
  },
});
