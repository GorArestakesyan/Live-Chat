import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useGlobalState} from '../../core/global';

const SearchButton = ({user}: any) => {
  // Add tick if user is already connected
  if (user.status === 'connected') {
    return (
      <FontAwesomeIcon
        icon={'circle-check'}
        size={30}
        color="#20d080"
        style={styles.checkedIcon}
      />
    );
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const requestConnect = useGlobalState((state: any) => state.requestConnect);

  switch (user.status) {
    case 'no-connection':
      user.text = 'Connect';
      user.disabled = false;
      user.onPress = () => requestConnect(user.username);
      break;
    case 'pending-them':
      user.text = 'Pending';
      user.disabled = true;
      user.onPress = () => {};
      break;
    case 'pending-me':
      user.text = 'Accept';
      user.disabled = false;
      user.onPress = () => {};
      break;
    default:
      break;
  }

  return (
    <TouchableOpacity
      onPress={user.onPress}
      style={[
        styles.btn,
        {backgroundColor: user.disabled ? '#505055' : '#202020'},
      ]}>
      <Text
        style={[
          styles.statusText,
          {color: user.disabled ? '#808080' : '#fff'},
        ]}>
        {user.text}
      </Text>
    </TouchableOpacity>
  );
};

export default SearchButton;

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 14,
    marginRight: 10,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
  },
  statusText: {
    fontWeight: 'bold',
  },
  checkedIcon: {
    marginRight: 10,
  },
});
