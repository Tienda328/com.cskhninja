import headerConst from '../network/headers';
import axios from 'axios';
import LOCALE_KEY, {clearLocale, getLocale} from '../../local/appLocale';
import {Alert, Keyboard} from 'react-native';
import alerts from '../../../constants/alerts';

const TIMEOUT = 60000;

const getDefaultHeader = async () => {
  const accessToken = await getLocale(LOCALE_KEY.access_token);
  return {
    Accept: headerConst.APPLICATION_JSON,
    Authorization: `${accessToken}`,
    'Content-Type': headerConst.APPLICATION_FORM,
  };
};

const handleResponse = async (response) => {
  if (!response) {
    Alert.alert(alerts.title, alerts.apiTimeout);
  }

  const result = await response.data;
  const status = result.status;
  if (!status) {
    Alert.alert(alerts.title, alerts.apiError);
  } else if ((status >= 200 && status < 300) || status === true) {
    // return when call api success
    return result;
  } else if (result.status === 406) {
    await clearLocale(LOCALE_KEY.access_token);
    Keyboard.dismiss();
    Alert.alert(
      alerts.title,
      result.message ?? alerts.apiExpiredToken,
      [
        {
          text: 'OK',
          onPress: async () => {
            await this.props.toggleLoggedIn();
          },
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  } else {
    Alert.alert(alerts.title, result.message ?? alerts.apiError);
  }
};

export async function post(url, params, headers, showLoading = true) {
  let response = null;
  const defaultHeader = await getDefaultHeader();
  const requestHeaders = {...defaultHeader, ...headers};
  const formData = new FormData();
  if (params) {
    const keys = Object.keys(params);
    keys.forEach((key) => {
      formData.append(key, params[key]);
    });
  }
  const isJson =
    requestHeaders[headerConst.CONTENT_TYPE] &&
    requestHeaders[headerConst.CONTENT_TYPE] === headerConst.APPLICATION_JSON;
  try {
    response = await axios.post(
      url,
      isJson ? JSON.stringify(params) : formData,
      {
        headers: requestHeaders,
        timeout: TIMEOUT,
        responseType: 'json',
      },
    );
  } catch (error) {
    response = await error.response;
  }
  const res = handleResponse(response);
  if (res) {
    return res;
  }
}
