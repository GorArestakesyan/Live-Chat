import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

interface IButton {
  title: string;
  onPress: () => void;
}

const Button = ({title, onPress}: IButton) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Text style={styles.btnTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    width: '90%',
    backgroundColor: '#202020',
    height: 52,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  btnTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
