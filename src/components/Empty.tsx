import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';

interface IEmpty {
  icon: string;
  message: string;
  centered?: boolean;
  size?: number;
}

const Empty = ({icon, message, size = 70, centered = true}: IEmpty) => {
  const emplyContainer: ViewStyle = {
    justifyContent: centered ? 'center' : 'flex-start',
  };
  return (
    <View style={[emplyContainer, styles.emptyContainer]}>
      <FontAwesomeIcon
        //@ts-ignore
        icon={icon}
        size={size}
        color="#d0d0d0"
        style={styles.icon}
      />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default Empty;

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 120,
  },
  text: {
    color: '#c3c3c3',
    fontSize: 15,
  },
  icon: {
    marginBottom: 15,
  },
});
