import AsyncStorage from '@react-native-community/async-storage';

const LOCALE_KEY = {
  access_token: 'access_token',
  email: 'email',
  pass_word:'pass_word',
  phone_number:'phone_number',
  user_name:'user_name',
  storage_infor: 'storage_infor',
  fcm_token: 'fcm_token',
  role : 'role ',
  leader : 'leader',

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
