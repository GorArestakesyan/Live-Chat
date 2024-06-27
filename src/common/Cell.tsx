import React, {PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';

const Cell = ({children}: PropsWithChildren) => {
  return <View style={styles.container}>{children}</View>;
};

export default Cell;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
    flex: 1,
  },
});
