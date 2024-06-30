import Thumbnail from '@components/Thumbnail';
import {useGlobalState} from '@core/global';
import utils from '@core/utils';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {ThemeContext} from '@screens/navigation/Navigation';
import React, {useContext} from 'react';
import {Pressable, StyleSheet, TouchableOpacity} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
const ProfileImage = () => {
  const {colors} = useContext(ThemeContext);

  const uploadThumbnail = useGlobalState(
    (state: any) => state?.uploadThumbnail,
  );
  const user = useGlobalState((state: any) => state.user);

  const handleUploadImage = () => {
    //@ts-ignore
    launchImageLibrary({includeBase64: true}, response => {
      utils.log('LAUNCH LIB', response);
      if (response.didCancel) {
        return;
      }
      const file = response?.assets?.[0];

      uploadThumbnail(file);
    });
  };

  return (
    <TouchableOpacity
      style={[styles.profileImageContainer, {shadowColor: colors.imageShadow}]}
      onPress={handleUploadImage}>
      <Thumbnail path={user.thumbnail} size={180} />
      <Pressable style={styles.editBox}>
        <FontAwesomeIcon icon={'pencil'} size={15} color="#d0d0d0" />
      </Pressable>
    </TouchableOpacity>
  );
};

export default ProfileImage;

const styles = StyleSheet.create({
  profileImageContainer: {
    marginBottom: 20,

    shadowOffset: {
      width: 4,
      height: 7,
    },
    shadowOpacity: 0.7,
    shadowRadius: 7,

    elevation: 11,
  },
  avatarImg: {
    width: 180,
    height: 180,
    borderWidth: 2,
    borderColor: '#ccc',
    backgroundColor: '#e0e0e0',
    borderRadius: 100,
  },
  editBox: {
    backgroundColor: '#000',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderColor: '#fff',
    borderWidth: 3,
  },
});
