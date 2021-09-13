import GetListNotification from '../request/Push/GetListNotification';
import {
  deleteFcmToken,
  getNotification,
  getUnreadNotification,
} from '../service/userService';
import GetUnreadNotiRequest from '../request/Push/GetUnreadNotiRequest';
import SaveUserDeviceTokenRequest from '../request/Push/SaveUserDeviceTokenRequest';

function getNotificationRepo(getListNoticeRequest: GetListNotification) {
  return getNotification(getListNoticeRequest);
}
function getUnreadNotificationRepo(getUnreadNotiRequest: GetUnreadNotiRequest) {
  return getUnreadNotification(getUnreadNotiRequest);
}

function deleteFcmTokenRepo(deleteDeviceToken: SaveUserDeviceTokenRequest) {
  return deleteFcmToken(deleteDeviceToken);
}

module.exports = {
  getNotificationRepo,
  getUnreadNotificationRepo,
  deleteFcmTokenRepo,
};
