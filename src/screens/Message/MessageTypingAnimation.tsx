import React, {useEffect, useRef} from 'react';
import {Animated, Easing, StyleSheet} from 'react-native';

interface IMessageTypingAnimation {
  offset: number;
}

const MessageTypingAnimation = ({offset}: IMessageTypingAnimation) => {
  const y = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const total = 1000;
    const bump = 200;
    const animation = Animated.loop(
      Animated.sequence([
        Animated.delay(bump * offset),
        Animated.timing(y, {
          toValue: 1,
          duration: bump,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(y, {
          toValue: 0,
          duration: bump,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.delay(total - bump * 2 - bump * offset),
      ]),
    );
    animation.start();
    return () => {
      animation.stop();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const translateY = y.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -6],
  });
  return (
    <Animated.View
      style={[styles.animationStyle, {transform: [{translateY}]}]}
    />
  );
};

export default MessageTypingAnimation;

const styles = StyleSheet.create({
  animationStyle: {
    width: 8,
    height: 8,
    marginHorizontal: 1.5,
    borderRadius: 4,
    backgroundColor: '#FFF',
  },
});
