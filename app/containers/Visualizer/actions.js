/*
 *
 * SignupPage actions
 *
 */

import {
  FETCH_ERROR,
  FETCH_REQUEST,
  FETCH_SUCCESS,
  COL_ERROR,
  COL_REQUEST,
  COL_SUCCESS,
  RESET_ERROR,
} from './constants';

export function fetchError(error) {
  return {
    type: FETCH_ERROR,
    error,
  };
}

export function fetchSucces() {
  return {
    type: FETCH_SUCCESS,
  };
}

export function fetchRequest(data) {
  return {
    type: FETCH_REQUEST,
    data,
  };
}

export function colError(error) {
  return {
    type: COL_ERROR,
    error,
  };
}

export function colSucces() {
  return {
    type: COL_SUCCESS,
  };
}

export function colRequest(data) {
  return {
    type: COL_REQUEST,
    data,
  };
}

export function resetError() {
  return {
    type: RESET_ERROR,
  };
}
