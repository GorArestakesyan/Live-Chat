import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useContext} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {ThemeContext} from '../navigation/Navigation';

interface IMessage {
  message: string;
  setMessage: (value: string) => void;
  onSend: () => void;
}

const MessageInput = ({message, setMessage, onSend}: IMessage) => {
  const {colors} = useContext(ThemeContext);

  return (
    <View style={[styles.inputContainer, {backgroundColor: colors.background}]}>
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Message..."
        placeholderTextColor={'#CCC'}
        style={[
          styles.input,
          {
            backgroundColor: colors.lightGray,
            borderColor: colors.background,
            color: colors.primaryText,
          },
        ]}
      />
      <TouchableOpacity onPress={onSend}>
        <FontAwesomeIcon
          icon={'paper-plane'}
          size={22}
          color={colors.activeTabIcon}
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

    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderRadius: 25,

    height: 50,
  },
  sendIcon: {
    marginHorizontal: 12,
  },
});
