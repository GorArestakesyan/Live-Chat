import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Thumbnail from '../../components/Thumbnail';
import MessageTypingAnimation from './MessageTypingAnimation';

interface IMessageBubbleFriend {
  text?: string;
  friend: any;
  typing?: boolean;
}

const MessageBubbleFriend = ({text, friend, typing}: IMessageBubbleFriend) => {
  return (
    <View style={styles.messageWrapper}>
      <Thumbnail size={42} path={friend.thumbnail} />
      <View style={styles.messageContainer}>
        {typing ? (
          <View style={styles.typingView}>
            <MessageTypingAnimation offset={0} />
            <MessageTypingAnimation offset={1} />
            <MessageTypingAnimation offset={2} />
          </View>
        ) : (
          <Text style={styles.messageText}>{text}</Text>
        )}
      </View>
      <View style={styles.flex} />
    </View>
  );
};

export default MessageBubbleFriend;

const styles = StyleSheet.create({
  messageWrapper: {
    padding: 4,
    paddingLeft: 12,
    flexDirection: 'row',
  },
  typingView: {
    flexDirection: 'row',
  },
  flex: {flex: 1},
  messageContainer: {
    backgroundColor: '#d0d2db',
    borderRadius: 21,
    maxWidth: '75%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginLeft: 8,
    minHeight: 42,
    justifyContent: 'center',
  },
  messageText: {
    color: '#202020',
    fontSize: 16,
    lineHeight: 18,
  },
});
