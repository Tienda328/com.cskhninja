import Request from '../Request';
import paramKeys from '../paramKeys';

export default class LoginRequest extends Request {
  static Keys = {
    PASSWORD: paramKeys.PASSWORD,
    TYPE: paramKeys.TYPE,
    EMAIL: paramKeys.EMAIL,
  };
}
