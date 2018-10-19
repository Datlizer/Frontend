/*
 *
 * SignupPage actions
 *
 */

import {
  FETCH_CONN_ERROR,
  FETCH_CONN_REQUEST,
  FETCH_CONN_SUCCESS,
  CONN_ERROR,
  CONN_REQUEST,
  CONN_SUCCESS,
  RESET_ERROR,
} from './constants';

export function fetchConnError(error) {
  return {
    type: FETCH_CONN_ERROR,
    error,
  };
}

export function fetchConnSucces() {
  return {
    type: FETCH_CONN_SUCCESS,
  };
}

export function fetchConnRequest(data) {
  return {
    type: FETCH_CONN_REQUEST,
    data,
  };
}

export function ConnError(error) {
  return {
    type: CONN_ERROR,
    error,
  };
}

export function ConnSucces() {
  return {
    type: CONN_SUCCESS,
  };
}

export function ConnRequest(data) {
  return {
    type: CONN_REQUEST,
    data,
  };
}



export function resetError() {
  return {
    type: RESET_ERROR,
  };
}
