import React from 'react';
import {Animated, StyleSheet} from 'react-native';

interface TTitle {
  text: string;
  color: string;
}

const Title = ({text, color}: TTitle) => {
  return <Animated.Text style={[styles.title, {color}]}>{text}</Animated.Text>;
};

export default Title;

const styles = StyleSheet.create({
  title: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 50,
    fontFamily: 'LeckerliOne-Regular',
  },
});
