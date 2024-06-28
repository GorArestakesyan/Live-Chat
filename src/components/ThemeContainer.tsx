import React, {useContext} from 'react';
import {View} from 'react-native';
import {ThemeContext} from '../screens/navigation/Navigation';

export const ThemeContainer = ({children}: {children: React.ReactNode}) => {
  const {colors} = useContext(ThemeContext);
  const containerStyle = {backgroundColor: colors.background, flex: 1};
  return <View style={containerStyle}>{children}</View>;
};
