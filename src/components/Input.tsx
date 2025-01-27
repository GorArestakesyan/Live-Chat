import {ThemeContext} from '@screens/navigation/Navigation';
import React, {useContext} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

interface IInput {
  title: string;
  value: string;
  isPassword?: boolean;
  onChange: (val: string) => void;
  setError: React.Dispatch<React.SetStateAction<string>>;
  error?: string | boolean;
}

const Input = ({
  title,
  value,
  error,
  isPassword = false,
  setError,
  onChange,
}: IInput) => {
  const {colors} = useContext(ThemeContext);
  return (
    <View style={styles.inputWrapper}>
      <Text
        style={[
          styles.inputHead,
          {
            color: error ? colors.error : colors.darkGraySecondary,
          },
        ]}>
        {error ? error : title}
      </Text>
      <TextInput
        autoCapitalize="none"
        autoComplete="off"
        textContentType={'oneTimeCode'}
        secureTextEntry={isPassword}
        style={[
          styles.input,
          {
            borderColor: error ? colors.error : colors.darkGraySecondary,
            borderWidth: error ? 1 : 0,
          },
        ]}
        value={value}
        onChangeText={e => {
          onChange(e);
          if (error) {
            setError('');
          }
        }}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputWrapper: {
    width: '90%',
  },
  inputHead: {
    marginVertical: 15,
    paddingLeft: 15,
  },
  input: {
    backgroundColor: '#e1e2e4',
    height: 52,
    borderRadius: 26,
    paddingHorizontal: 16,
    fontSize: 15,
  },
});
