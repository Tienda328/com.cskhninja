import LoginRequest from '../request/auth/LoginRequest';
import urls from '../urls';
import {networkRef} from '../network/index';

function login(loginRequest: LoginRequest) {
  const params = loginRequest.getParams();
  return networkRef.current.post(urls.LOGIN, params, {});
}

module.exports = {
  login,
};
