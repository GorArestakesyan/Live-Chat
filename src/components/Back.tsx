import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {TouchableOpacity} from 'react-native';

interface IBack {
  size?: number;
  color?: string;
  onPress: any;
}

const Back = ({size = 25, color = '#606060', onPress = () => {}}: IBack) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <FontAwesomeIcon
        size={size}
        color={color}
        icon="caret-left"
        style={{left: 10}}
      />
    </TouchableOpacity>
  );
};

export default Back;
