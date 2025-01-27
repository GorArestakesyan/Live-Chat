import Empty from '@components/Empty';
import {ThemeContainer} from '@components/ThemeContainer';
import {useGlobalState} from '@core/global';
import React from 'react';
import {ActivityIndicator, FlatList} from 'react-native';
import FriendRow from './FriendRow';

const FriendsScreen = ({navigation}: any) => {
  const friendsList = useGlobalState((state: any) => state.friendList);

  if (friendsList === null) {
    return (
      <ThemeContainer>
        <ActivityIndicator style={{flex: 1}} />
      </ThemeContainer>
    );
  }

  // Show empty if no requests
  if (!friendsList?.length) {
    return <Empty icon="inbox" message="No messages yet" />;
  }

  return (
    <ThemeContainer>
      <FlatList
        data={friendsList}
        renderItem={({item}) => (
          <FriendRow navigation={navigation} item={item} />
        )}
        keyExtractor={item => item.id}
      />
    </ThemeContainer>
  );
};

export default FriendsScreen;
