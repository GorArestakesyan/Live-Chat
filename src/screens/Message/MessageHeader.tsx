import Thumbnail from '@components/Thumbnail';
import {ThemeContext} from '@screens/navigation/Navigation';
import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const MessageHeader = ({friend}: any) => {
  const {colors} = useContext(ThemeContext);
  return (
    <View style={styles.headerContainer}>
      <Thumbnail path={friend.thumbnail} size={30} />

      <Text style={[styles.name, {color: colors.primaryText}]}>
        {friend.name}
      </Text>
    </View>
  );
};

export default MessageHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  name: {
    color: '#202020',
    fontWeight: 'bold',
    fontSize: 18,
  },
  fakeBox: {
    width: '30%',
  },
});
