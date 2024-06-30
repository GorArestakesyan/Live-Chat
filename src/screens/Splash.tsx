import React, {useContext, useEffect} from 'react';
import {Animated, Image, SafeAreaView, StyleSheet} from 'react-native';
import Title from '../common/Title';
import {ThemeContext} from './navigation/Navigation';

const DURATION = 900;

const Splash = ({navigation}: any) => {
  const translateY = new Animated.Value(-1200);
  const {colors} = useContext(ThemeContext);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {goBack} = navigation;
  const animatedStyle = {
    flex: 1,
    transform: [{translateY}],
  };
  console.log(colors);

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: DURATION,
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <Animated.View style={[animatedStyle, styles.splashBox]}>
        <Title text="Live Chat" color={colors.primaryText} />
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
  },
  splashBox: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
});
