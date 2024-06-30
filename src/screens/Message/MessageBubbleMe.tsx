import {ThemeContext} from '@screens/navigation/Navigation';
import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface IMessageBubbleMe {
  text: string;
}

const MessageBubbleMe = ({text}: IMessageBubbleMe) => {
  const {colors} = useContext(ThemeContext);
  return (
    <View style={styles.messageWrapper}>
      <View style={styles.flex} />
      <View
        style={[
          styles.messageContainer,
          {backgroundColor: colors.activeTabIcon},
        ]}>
        <Text style={[styles.messageText]}>{text}</Text>
      </View>
    </View>
  );
};

export default MessageBubbleMe;

const styles = StyleSheet.create({
  messageWrapper: {
    padding: 4,
    flexDirection: 'row',
    paddingRight: 12,
  },
  flex: {flex: 1},
  messageContainer: {
    borderRadius: 21,
    maxWidth: '75%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 8,
    minHeight: 42,
    justifyContent: 'center',
  },
  messageText: {
    color: '#FFF',
    fontSize: 16,
    lineHeight: 18,
  },
});
