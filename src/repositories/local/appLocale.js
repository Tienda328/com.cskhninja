import AsyncStorage from '@react-native-community/async-storage';

const LOCALE_KEY = {
  access_token: 'access_token',
  phone_number: 'phone_number',
  storage_infor: 'storage_infor',
  fcm_token: 'fcm_token',
};

export default LOCALE_KEY;

export async function getLocale(key) {
  const session = await AsyncStorage.getItem(key);
  return session;
}

export function setLocale(key, locale) {
  return AsyncStorage.setItem(key, locale);
}

export function clearLocale(key) {
  return AsyncStorage.removeItem(key);
}
