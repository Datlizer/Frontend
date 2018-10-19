/*
 *
 * SignupPage actions
 *
 */

import {
  COL_ERROR,
  COL_REQUEST,
  COL_SUCCESS,
  RESET_ERROR,
} from './constants';

export function colError(error) {
  return {
    type: COL_ERROR,
    error,
  };
}

export function colSuccess() {
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
