/*
 *
 * SignupPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  RESET_ERROR,
} from './constants';

const initialState = fromJS({
  error: null,
});

function signinReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST: {
      console.log('action', action);
      return state;
    }
    case LOGIN_SUCCESS:
      return state;

    case LOGIN_ERROR: {
      console.log('action', action);
      return state.set('error', action.error);
    }


    case RESET_ERROR:
      return state;
    default:
      return state;
  }
}

export default signinReducer;
