import actionTypes from './actionTypes';


export const startLoadingAction = (appState) => ({
  type: actionTypes.START_LOADING,
  payload: appState,
});

export const stopLoadingAction = (appState) => ({
  type: actionTypes.STOP_LOADING,
  payload: appState,
});

export const getUserInFor = (payload) => ({
  type: actionTypes.USER_INFOR,
  payload: payload,
});
