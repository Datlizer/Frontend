/*
 *
 * signup reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  RESET_ERROR,
} from './constants';

const initialState = fromJS({
  error: null,
});

function signupReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNUP_REQUEST: {
      console.log('action', action);
      return state;
    }
    case SIGNUP_SUCCESS:
      return state;
    case SIGNUP_ERROR: {
      console.log('action', action);
      return state.set('error', action.error);
    }
    case RESET_ERROR:
      return state;
    default:
      return state;
  }
}

export default signupReducer;
