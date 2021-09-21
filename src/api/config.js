import {
  Alert
} from 'react-native';
const baseUrl = 'http://ninjagroup.rest/api/app/graphql';

let HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const onResponse = async (request, result) => {
  try {
    const body = await result.text();
    const newBody = JSON.parse(body);

    // Response is json but not a successful response
    if (result.status !== 200) {
      const exception = {
        exception: newBody,
        type: 'object'
      };
      throw exception;
    }else if (result.status === 200) {
      Alert.alert(
        "Thông báo",
        newBody.message,
        [
          { text: "OK", onPress: () => {} }
        ]
      );
    }

    // SUCCESS: Return valid response
    return newBody;
  } catch (e) {
    if (e?.type === 'object') throw e;
    // console.log(result.status, result._bodyText); // uncomment this line if unexpected error occured
    // SUCCESS: when response is {} and status 200 but parsing JSON failed. Still is success response
    if (result.status === true) return result;

    // // FAILED: Throw unknown exceptions
    const exception = {
      exception: result,
      type: 'raw'
    };
    throw exception;
  }
};

const config = {
  post: async ( params: Object) => {
    // await TokenHelper.refreshToken();
    const url = baseUrl;
    const options = {
      method: 'POST',
      body: JSON.stringify(params),
      headers: HEADERS
    };
    const request = {
      url,
      options
    };

    return fetch(url, options).then(result => onResponse(request, result));
  },

  get: async (endpoint: string, params: Object = {}) => {
    // await TokenHelper.refreshToken();
    const url = baseUrl + endpoint;
    const options = {
      method: 'GET',
      headers: HEADERS
    };
    const request = {
      url,
      options
    };
    return fetch(url, options).then(result => onResponse(request, result));
  },

  put: async (endpoint: string, params: Object) => {
    // await TokenHelper.refreshToken();
    const url = baseUrl + endpoint;
    const options = {
      method: 'PUT',
      headers: HEADERS,
      body: JSON.stringify(params)
    };
    const request = {
      url,
      options
    };
    return fetch(url, options).then(result => onResponse(request, result));
  },

  delete: async (endpoint: string, params: Object) => {
    // await TokenHelper.refreshToken();
    const url = baseUrl + endpoint;
    const options = {
      method: 'DELETE',
      headers: HEADERS
    };
    const request = {
      url,
      options
    };
    return fetch(url, options).then(result => onResponse(request, result));
  },

  multipartPost: async (endpoint: string, params: Object) => {
    // await TokenHelper.refreshToken();
    const url = baseUrl + endpoint;
    const options = {
      method: 'POST',
      body: createFormData(params),
      headers: HEADERS
    };

    const request = {
      url,
      options
    };
    return fetch(url, options).then(result => onResponse(request, result));
  }
};
const getApiUrl = () => baseUrl;

export { config, getApiUrl };
