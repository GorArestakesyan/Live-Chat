import utils from '@core/utils';
import React from 'react';
import {Image, StyleSheet} from 'react-native';

interface IThumbnail {
  path: string;
  size: number;
}

const Thumbnail = ({path, size}: IThumbnail) => {
  const style = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  return (
    <Image
      source={utils.thumbnail(path)}
      style={[styles.avatarImg, style]}
      resizeMode="cover"
    />
  );
};

export default Thumbnail;

const styles = StyleSheet.create({
  avatarImg: {
    borderWidth: 2,
    borderColor: '#ccc',
    backgroundColor: '#e0e0e0',
    borderRadius: 100,
  },
});
