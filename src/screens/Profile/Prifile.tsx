import {ThemeContainer} from '@components/ThemeContainer';
import {useGlobalState} from '@core/global';
import {IGlobalState} from '@core/types';
import {ThemeContext} from '@screens/navigation/Navigation';
import {colors as theme} from '@utils/Colors';
import React, {useContext, useEffect} from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import ProfileImage from './ProfileImage';
import ProfileLogout from './ProfileLogout';

const ProfileScreen = () => {
  const user = useGlobalState((state: IGlobalState) => state.user);
  const {colors, toggleTheme} = useContext(ThemeContext);
  useEffect(() => {
    console.log('theme.dark === colors', theme.dark === colors);
  }, [colors]);
  return (
    <ThemeContainer>
      <View style={styles.toggleWrapper}>
        <Switch
          value={theme.dark === colors}
          onValueChange={toggleTheme}
          style={styles.switch}
          thumbColor={colors.background}
          trackColor={{false: colors.black, true: colors.white}}
        />

        <Text style={[styles.themeText, {color: colors.primaryText}]}>
          Change theme
        </Text>
      </View>
      <View style={styles.profileContainer}>
        <ProfileImage />
        <Text style={[styles.name, {color: colors.name}]}>{user?.name}</Text>
        <Text style={styles.nick}>@{user?.username}</Text>
        <ProfileLogout />
      </View>
    </ThemeContainer>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 100,
  },
  themeImg: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  toggleWrapper: {
    paddingHorizontal: 20,
    paddingTop: 20,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  switch: {
    shadowColor: '#ccc',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 7,
  },
  name: {
    textAlign: 'center',
    color: '#303030',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
  },
  nick: {
    textAlign: 'center',
    color: '#606060',
    fontSize: 14,
    marginTop: 10,
  },
  themeText: {
    textAlign: 'center',
    color: '#606060',
    fontSize: 14,
    marginTop: 10,
    fontFamily: 'LeckerliOne-Regular',
  },
});
