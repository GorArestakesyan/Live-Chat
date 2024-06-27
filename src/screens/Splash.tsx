import React, {useEffect} from 'react';
import {
  Animated,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import Title from '../common/Title';

const DURATION = 900;

const Splash = ({navigation}: any) => {
  const translateY = new Animated.Value(-1200);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {goBack} = navigation;
  const animatedStyle = {
    transform: [{translateY}],
  };

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: DURATION,
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <StatusBar animated={true} barStyle={'default'} />
      <Animated.View style={[animatedStyle, styles.splashBox]}>
        <Title text="Live Chat" color="#fff" />
        <Image source={require('../assets/gifs/icons8-chat.gif')} />
      </Animated.View>
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  splashBox: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
});
