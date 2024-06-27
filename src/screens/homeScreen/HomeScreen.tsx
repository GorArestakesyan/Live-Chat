/* eslint-disable react/no-unstable-nested-components */
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect, useLayoutEffect} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Thumbnail from '../../components/Thumbnail';
import {useGlobalState} from '../../core/global';
import FriendsScreen from '../Friends/FriendsScreen';
import ProfileScreen from '../Profile/Prifile';
import RequestsScreen from '../Requests/Requests';

const Tab = createBottomTabNavigator();

const HomeScreen = ({navigation}: any) => {
  const socketConnect = useGlobalState((state: any) => state.socketConnect);
  const socketClose = useGlobalState((state: any) => state.socketClose);
  const user = useGlobalState((state: any) => state.user);

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
        headerLeft: () => {
          return (
            <View style={styles.avatarImgWrapper}>
              <Thumbnail path={user.thumbnail} size={28} />
            </View>
          );
        },
        headerRight: () => {
          return (
            <TouchableOpacity style={styles.searchIcon} onPress={onSearch}>
              <FontAwesomeIcon
                icon={'magnifying-glass'}
                size={22}
                color="#404040"
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
        tabBarActiveTintColor: '#52A447',
        tabBarInactiveTintColor: '#ccc',
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
