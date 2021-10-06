import moment from 'moment';
import { stringMd5 } from 'react-native-quick-md5';
import { Dimensions, Platform, StatusBar } from 'react-native';

function formatNumber(number) {
  if (!number && number !== 0) {
    return '';
  }
  return (
    Math.ceil(number)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ'
  );
}

function formatDate(date) {
  if (date) {
    return moment(date).utc().format('MM/DD/YYYY');
  } else {
    return '';
  }
}

function formatDate2(date) {
  if (date) {
    return moment(date).utc().format('DD/MM/YYYY');
  } else {
    return '';
  }
}

function DataSeach(string) {
  const data = [];
  data.push(string);
  return data

}


function timeStamp() {
  const today = new Date();
  let date = new Date(Date.UTC(today.getFullYear(), today.getMonth() - 1, today.getDate(), today.getHours(), today.getMinutes(), today.getSeconds()));
  let timeStamp = date.getTime() / 1000;
  return timeStamp;
}

function createToken(timeStamp) {
  const token = stringMd5('16518b38c0234509b38a34f6ca091e8686' + `${timeStamp}`);
  return token;
}
export function getStatusBarHeight(safe) {
  return Platform.select({
    ios: ifIphoneX(safe ? 44 : 30, 20),
    android: StatusBar.currentHeight
  });
}

export function isIphoneX() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 896 ||
      dimen.width === 896)
  );
}

export function ifIphoneX(iphoneXStyle, regularStyle) {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
}

export function lastDay(day) {
  const today = new Date();
  const nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - day);
  return formatDate(nextweek);
}

export function firstMonth() {
  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);

  return formatDate(firstDay);
}
export function lastMonth() {
  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

  return formatDate(firstDay);
}

export function firstLastMonth() {
  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth()-1, 2);
  return formatDate(firstDay);
}

const common = {
  formatNumber,
  timeStamp,
  DataSeach,
  formatDate,
  createToken,
  getStatusBarHeight,
  formatDate2,
  firstMonth,
  lastMonth,
  lastDay,
  firstLastMonth,
};

export default common;