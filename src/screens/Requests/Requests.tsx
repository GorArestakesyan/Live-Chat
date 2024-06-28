import React from 'react';
import {ActivityIndicator, FlatList} from 'react-native';
import Empty from '../../components/Empty';
import {ThemeContainer} from '../../components/ThemeContainer';
import {useGlobalState} from '../../core/global';
import RequestRow from './RequestRow';

const RequestsScreen = () => {
  const requestsList = useGlobalState((state: any) => state.requestList);

  if (requestsList === null) {
    return (
      <ThemeContainer>
        <ActivityIndicator style={{flex: 1}} />
      </ThemeContainer>
    );
  }

  // Show empty if no requests
  if (requestsList.length === 0) {
    return (
      <ThemeContainer>
        <Empty icon="bell" message="No requests" />
      </ThemeContainer>
    );
  }

  return (
    <ThemeContainer>
      <FlatList
        data={requestsList}
        renderItem={({item}) => <RequestRow item={item} />}
        keyExtractor={item => item.sender.username}
      />
    </ThemeContainer>
  );
};

export default RequestsScreen;
