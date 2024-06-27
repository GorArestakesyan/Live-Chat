import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import Back from '../../components/Back';
import Empty from '../../components/Empty';
import {useGlobalState} from '../../core/global';
import SearchRow from './SearchRow';

const SearchScreen = ({navigation}: any) => {
  const [query, setQuery] = useState('');
  const searchList = useGlobalState((state: any) => state.searchList);
  const searchUsers = useGlobalState((state: any) => state.searchUsers);

  useEffect(() => {
    searchUsers(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Back size={40} onPress={() => navigation.goBack()} />,
    });
  });
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
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
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  searchContainer: {
    padding: 15,
    borderBottomWidth: 1,
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
