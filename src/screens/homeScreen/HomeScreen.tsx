import React, {useContext, useEffect, useLayoutEffect} from 'react';
import {Pressable, StyleSheet, TouchableOpacity} from 'react-native';
/* eslint-disable react/no-unstable-nested-components */
import Thumbnail from '@components/Thumbnail';
import {useGlobalState} from '@core/global';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FriendsScreen from '@screens/Friends/FriendsScreen';
import ProfileScreen from '@screens/Profile/Prifile';
import RequestsScreen from '@screens/Requests/Requests';
import {ThemeContext} from '@screens/navigation/Navigation';

const Tab = createBottomTabNavigator();

const HomeScreen = ({navigation}: any) => {
  const socketConnect = useGlobalState((state: any) => state.socketConnect);
  const socketClose = useGlobalState((state: any) => state.socketClose);
  const user = useGlobalState((state: any) => state.user);
  //@ts-ignore
  const {colors} = useContext(ThemeContext);

  const onSearch = () => navigation.navigate('Search');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socketConnect();
    return () => {
      socketClose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerStyle: {backgroundColor: colors.background},
        headerTitleStyle: {color: colors.primaryText},
        headerLeft: () => {
          return (
            <Pressable
              style={styles.avatarImgWrapper}
              onPress={() => navigation.navigate('Profile')}>
              <Thumbnail path={user.thumbnail} size={28} />
            </Pressable>
          );
        },
        headerRight: () => {
          return (
            <TouchableOpacity style={styles.searchIcon} onPress={onSearch}>
              <FontAwesomeIcon
                icon={'magnifying-glass'}
                size={22}
                color={colors.lightGray2}
              />
            </TouchableOpacity>
          );
        },
        tabBarIcon: ({color}) => {
          const icons = {
            Requests: 'bell',
            Friends: 'inbox',
            Profile: 'user',
          };
          //@ts-ignore
          const icon = icons[route.name];
          return <FontAwesomeIcon icon={icon} size={28} color={color} />;
        },
        tabBarShowLabel: false,
        tabBarItemStyle: {backgroundColor: colors.background},
        tabBarActiveTintColor: colors.activeTabIcon,
        tabBarInactiveTintColor: colors.gray,
      })}>
      <Tab.Screen name="Requests" component={RequestsScreen} />
      <Tab.Screen name="Friends" component={FriendsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  searchIcon: {
    marginRight: 20,
  },

  avatarImgWrapper: {
    marginLeft: 20,
  },
});
