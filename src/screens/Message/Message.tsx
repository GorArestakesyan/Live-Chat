import Back from '@components/Back';
import {ThemeContainer} from '@components/ThemeContainer';
import {useGlobalState} from '@core/global';
import MessageBubble from '@screens/Message/MessageBubble';
import MessageHeader from '@screens/Message/MessageHeader';
import MessageInput from '@screens/Message/MessageInput';
import {ThemeContext} from '@screens/navigation/Navigation';
import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
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

const MessageScreen = ({navigation, route}: any) => {
  const {colors} = useContext(ThemeContext);
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
      headerStyle: {backgroundColor: colors.background},
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
      <ThemeContainer>
        <View
          style={[
            {
              marginBottom: Platform.OS === 'ios' ? 60 : 0,
            },
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
          <InputAccessoryView backgroundColor={colors.background}>
            <MessageInput
              message={message}
              setMessage={onType}
              onSend={onSend}
            />
          </InputAccessoryView>
        ) : (
          <MessageInput message={message} setMessage={onType} onSend={onSend} />
        )}
      </ThemeContainer>
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
