/*
 *
 * SignupPage actions
 *
 */

import {
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  RESET_ERROR,
} from './constants';

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error,
  };
}

export function loginSucces() {
  return {
    type: LOGIN_SUCCESS,
  };
}

export function loginRequest(data) {
  return {
    type: LOGIN_REQUEST,
    data,
  };
}

export function resetError() {
  return {
    type: RESET_ERROR,
  };
}
