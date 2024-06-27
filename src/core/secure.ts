import EncryptedStoreage from 'react-native-encrypted-storage';

async function set(key: string, object: any) {
  try {
    await EncryptedStoreage.setItem(key, JSON.stringify(object));
  } catch (error) {
    console.log('Secure.set:', error);
  }
}
async function get(key: string) {
  try {
    const data: any = await EncryptedStoreage.getItem(key);
    if (data !== undefined) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.log('Secure.get:', error);
  }
}
async function remove(key: string) {
  try {
    await EncryptedStoreage.removeItem(key);
  } catch (error) {
    console.log('Secure.remove:', error);
  }
}
async function wipe() {
  try {
    await EncryptedStoreage.clear();
  } catch (error) {
    console.log('Secure.wipe:', error);
  }
}

export default {
  set,
  get,
  remove,
  wipe,
};
