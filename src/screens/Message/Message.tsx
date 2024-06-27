import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  FlatList,
  InputAccessoryView,
  Keyboard,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Back from '../../components/Back';
import {useGlobalState} from '../../core/global';
import MessageBubble from './MessageBubble';
import MessageHeader from './MessageHeader';
import MessageInput from './MessageInput';

const MessageScreen = ({navigation, route}: any) => {
  const [message, setMessage] = useState('');

  const friend = route.params.friend;
  const connectionID = route.params.id;

  const messagesList = useGlobalState((state: any) => state.messageList);
  const messagesNext = useGlobalState((state: any) => state.messagesNext);

  const sendMessage = useGlobalState((state: any) => state.messageSend);
  const messagesTyping = useGlobalState((state: any) => state.messageType);
  const messages = useGlobalState((state: any) => state.messagesList);

  const onType = (value: string) => {
    setMessage(value);
    if (value.length) {
      messagesTyping(friend.username);
    }
  };

  const onSend = () => {
    const cleaned = message.replace(/\s+/g, ' ').trim();
    if (!cleaned.length) {
      return;
    } else {
      sendMessage(connectionID, cleaned);
      setMessage('');
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <MessageHeader friend={friend} />,
      headerLeft: () => <Back size={40} onPress={() => navigation.goBack()} />,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    messagesList(connectionID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectionID]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={[
          styles.messagesContainer,
          {marginBottom: Platform.OS === 'ios' ? 60 : 0},
        ]}>
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={styles.messagesContainer}>
          <FlatList
            data={[{id: -1}, ...messages]}
            inverted={true}
            automaticallyAdjustKeyboardInsets={true}
            horizontal={false}
            onEndReached={() => {
              if (messagesNext) {
                messagesList(connectionID, messagesNext);
              }
            }}
            contentContainerStyle={styles.flatlistContainer}
            keyExtractor={(item, index) => `${item?.id}${index}`}
            renderItem={({item, index}) => (
              <MessageBubble message={item} index={index} friend={friend} />
            )}
          />
        </TouchableWithoutFeedback>
      </View>

      {Platform.OS === 'ios' ? (
        <InputAccessoryView backgroundColor={'#fff'}>
          <MessageInput message={message} setMessage={onType} onSend={onSend} />
        </InputAccessoryView>
      ) : (
        <MessageInput message={message} setMessage={onType} onSend={onSend} />
      )}
    </SafeAreaView>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({
  messagesContainer: {
    flex: 1,
  },
  flatlistContainer: {
    paddingVertical: 10,
  },
});
