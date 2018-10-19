/*
 *
 * SignupPage actions
 *
 */

import {
  SIGNUP_ERROR,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  RESET_ERROR,
} from './constants';

export function signupError(error) {
  return {
    type: SIGNUP_ERROR,
    error,
  };
}

export function signupSucces() {
  return {
    type: SIGNUP_SUCCESS,
  };
}

export function signupRequest(data) {
  return {
    type: SIGNUP_REQUEST,
    data,
  };
}

export function resetError() {
  return {
    type: RESET_ERROR,
  };
}
