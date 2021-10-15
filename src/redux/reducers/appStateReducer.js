import actionTypes from '../actions/actionTypes';

const initializedState = {
  isLoading: false,
  fcmRegistered: false,
  isUserInFo: null,
  isVersionAndroid: '1.0.6',
  isVersionIos: '1.0.1',
  isDay: null,
};

const appStateReducer = (state = initializedState, action) => {
  switch (action.type) {
    case actionTypes.START_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.STOP_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.USER_INFOR:
      return {
        ...state,
        isUserInFo: action.payload,
      };
    case actionTypes.IS_DAY:
      return {
        ...state,
        isDay: action.payload,
      };
    default:
      return state;
  }
};

export default appStateReducer;
