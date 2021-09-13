import {combineReducers} from 'redux';
import appStateReducer from './appStateReducer';
import actionTypes from '../actions/actionTypes';

const appReducer = combineReducers({
  appState: appStateReducer,
});

const rootReducer = (state, action) => {
  const newState =
    action.type === actionTypes.USER_LOGOUT
      ? {
          appState: {
            ...state.appState,
          },
        }
      : state;

  return appReducer(newState, action);
};

export default rootReducer;
