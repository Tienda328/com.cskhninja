import axios from 'axios';
import headerConst from './headers';
import {clearLocale, getLocale} from '../../local/appLocale';
import LOCALE_KEY from '../../local/appLocale';
import React, {Component, createRef} from 'react';
import {Alert, Keyboard} from 'react-native';
import PropTypes from 'prop-types';
import LoadingComponent from '../../../components/LoadingComponent';
import NetInfo from '@react-native-community/netinfo';
import alerts from '../../../constants/alerts';

export let networkRef = createRef();

const TIMEOUT = 60000;

function getFileName(file) {
  if (file.name !== undefined) {
    return file.name;
  } else if (file.filename !== undefined && file.filename !== null) {
    return file.filename;
  } else {
    return (
      Math.floor(Math.random() * Math.floor(999999999)) +
      '.' +
      file.mime.split('/')[1]
    );
  }
}

class NetworkService extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isConnected: true,
    };

    NetInfo.addEventListener((state) => {
      this.setState({isConnected: state.isConnected});
    });
    NetInfo.fetch().then((state) => {
      this.setState({isConnected: state.isConnected});
    });
  }

  render() {
    return <LoadingComponent modalVisible={this.state.isLoading} />;
  }

  getDefaultHeader = async () => {
    const accessToken = await getLocale(LOCALE_KEY.access_token);
    return {
      Accept: headerConst.APPLICATION_JSON,
      Authorization: `${accessToken}`,
      'Content-Type': headerConst.APPLICATION_FORM,
    };
  };

  handleResponse = async (response) => {
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

  get = async (url, params, headers) => {
    if (this.state.isConnected) {
      const {state} = await NetInfo.fetch();
      if (!state.isConnected) {
        Alert.alert(alerts.title, alerts.noNetwork);
        return;
      }
      this.setState({
        isLoading: true,
      });
      const body = [];
      const defaultHeader = await this.getDefaultHeader();
      const requestHeaders = {...defaultHeader, ...headers};
      if (params) {
        const keys = Object.keys(params);
        keys.forEach((key) => {
          body.push(`${key}=${params[key]}`);
        });
      }
      const strQuery = body.join('&');
      const finalUrl = params ? `${url}?${strQuery}` : `${url}`;
      let response = null;
      try {
        response = await axios.get(finalUrl, {
          headers: requestHeaders,
          timeout: TIMEOUT,
          responseType: 'json',
        });
      } catch (error) {
        response = await error.response;
      }
      this.setState({
        isLoading: false,
      });
      const res = this.handleResponse(response);
      if (res) {
        return res;
      }
    } else {
      Alert.alert(alerts.title, alerts.noNetwork);
    }
  };

  post = async (url, params, headers, showLoading = true) => {
    if (this.state.isConnected) {
      if (showLoading) {
        this.setState({
          isLoading: true,
        });
      }
      let response = null;
      const defaultHeader = await this.getDefaultHeader();

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
        requestHeaders[headerConst.CONTENT_TYPE] ===
          headerConst.APPLICATION_JSON;
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
      if (showLoading) {
        this.setState({
          isLoading: false,
        });
      }
      const res = this.handleResponse(response);
      if (res) {
        return res;
      }
    } else {
      Alert.alert(alerts.title, alerts.noNetwork);
    }
  };

  postSimply = async (url, params, headers) => {
    if (this.state.isConnected) {
      let response = null;
      const formData = new FormData();
      if (params) {
        const keys = Object.keys(params);
        keys.forEach((key) => {
          formData.append(key, params[key]);
        });
      }
      const isJson =
        headers[headerConst.CONTENT_TYPE] &&
        headers[headerConst.CONTENT_TYPE] === headerConst.APPLICATION_JSON;
      try {
        response = await axios.post(
          url,
          isJson ? JSON.stringify(params) : formData,
          {
            headers: headers,
            timeout: TIMEOUT,
            responseType: 'json',
          },
        );
      } catch (error) {
        response = await error.response;
      }

      const res = await this.handleResponse(response);
      if (res) {
        return res;
      }
    } else {
      Alert.alert(alerts.title, alerts.noNetwork);
    }
  };

  updateProfileContainFile = async (url, params, headers) => {
    if (this.state.isConnected) {
      this.setState({
        isLoading: true,
      });
      let response = null;
      const defaultHeader = await this.getDefaultHeader();

      const requestHeaders = {...defaultHeader, ...headers};
      const formData = new FormData();
      if (params) {
        const keys = Object.keys(params);
        keys.forEach((key) => {
          if (key !== 'file') {
            formData.append(key, params[key]);
          } else {
            formData.append(key, {
              uri: params[key].path,
              name: getFileName(params[key]),
              type: params[key].mime,
            });
          }
        });
      }
      const isJson =
        requestHeaders[headerConst.CONTENT_TYPE] &&
        requestHeaders[headerConst.CONTENT_TYPE] ===
          headerConst.APPLICATION_JSON;
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

      this.setState({
        isLoading: false,
      });
      const res = await this.handleResponse(response);
      if (res) {
        return res;
      }
    } else {
      Alert.alert(alerts.title, alerts.noNetwork);
    }
  };

  postFile = async (
    url,
    params,
    headers,
    type,
    uri,
    name,
    typeImage,
    files,
    idContract,
  ) => {
    if (this.state.isConnected) {
      this.setState({
        isLoading: true,
      });
      let response = null;
      const defaultHeader = await this.getDefaultHeader();

      const requestHeaders = {...defaultHeader, ...headers};

      const formData = new FormData();
      formData.append('type', 2);
      formData.append('type_img', typeImage);
      formData.append('id', idContract);
      // files.pop();
      files.forEach((file) => {
        const fileObject = {
          uri: file.path,
          name: getFileName(file),
          type: file.mime,
        };
        formData.append('file[]', fileObject);
      });
      try {
        response = await axios.post(url, formData, {
          headers: requestHeaders,
          timeout: TIMEOUT,
          responseType: 'json',
        });
      } catch (error) {
        response = await error.response;
      }
      this.setState({
        isLoading: false,
      });
      const res = this.handleResponse(response);
      if (res) {
        return res;
      }
    } else {
      Alert.alert(alerts.title, alerts.noNetwork);
    }
  };
}

NetworkService.propTypes = {
  toggleLoggedIn: PropTypes.func.isRequired,
};

export default NetworkService;
