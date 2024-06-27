import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';

interface IMessage {
  message: string;
  setMessage: (value: string) => void;
  onSend: () => void;
}

const MessageInput = ({message, setMessage, onSend}: IMessage) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Message..."
        placeholderTextColor={'#909090'}
        style={styles.input}
      />
      <TouchableOpacity onPress={onSend}>
        <FontAwesomeIcon
          icon={'paper-plane'}
          size={22}
          color={'#52a447'}
          style={styles.sendIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default MessageInput;

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: '#d0d0d0',
    backgroundColor: '#FFF',
    height: 50,
  },
  sendIcon: {
    marginHorizontal: 12,
  },
});
