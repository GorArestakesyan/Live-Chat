import React, {PropsWithChildren, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {ThemeContext} from '../screens/navigation/Navigation';

const Cell = ({children}: PropsWithChildren) => {
  const {colors} = useContext(ThemeContext);

  return (
    <View style={[styles.container, {borderColor: colors.lightGray}]}>
      {children}
    </View>
  );
};

export default Cell;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.7,
    flex: 1,
  },
});
