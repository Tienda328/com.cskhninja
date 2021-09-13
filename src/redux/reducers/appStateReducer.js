import actionTypes from '../actions/actionTypes';

const initializedState = {
  isLoading: false,
  fcmRegistered: false,
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
    default:
      return state;
  }
};

export default appStateReducer;
