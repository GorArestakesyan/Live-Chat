import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useContext} from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import {ThemeContext} from '../screens/navigation/Navigation';
import {ThemeContainer} from './ThemeContainer';

interface IEmpty {
  icon: string;
  message: string;
  centered?: boolean;
  size?: number;
}

const Empty = ({icon, message, size = 70, centered = true}: IEmpty) => {
  const {colors} = useContext(ThemeContext);
  const emplyContainer: ViewStyle = {
    justifyContent: centered ? 'center' : 'flex-start',
  };
  return (
    <ThemeContainer>
      <View style={[emplyContainer, styles.emptyContainer]}>
        <FontAwesomeIcon
          //@ts-ignore
          icon={icon}
          size={size}
          color={colors.lightGray}
          style={styles.icon}
        />
        <Text style={styles.text}>{message}</Text>
      </View>
    </ThemeContainer>
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
