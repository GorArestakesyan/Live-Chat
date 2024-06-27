import React from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import Empty from '../../components/Empty';
import {useGlobalState} from '../../core/global';
import RequestRow from './RequestRow';

const RequestsScreen = () => {
  const requestsList = useGlobalState((state: any) => state.requestList);

  if (requestsList === null) {
    return <ActivityIndicator style={{flex: 1}} />;
  }

  // Show empty if no requests
  if (requestsList.length === 0) {
    return <Empty icon="bell" message="No requests" />;
  }

  return (
    <View style={styles.requestsWrapper}>
      <FlatList
        data={requestsList}
        renderItem={({item}) => <RequestRow item={item} />}
        keyExtractor={item => item.sender.username}
      />
    </View>
  );
};

export default RequestsScreen;

const styles = StyleSheet.create({
  requestsWrapper: {
    flex: 1,
  },
});
