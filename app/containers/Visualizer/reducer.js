/*
 *
 * SignupPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_ERROR,
  COL_REQUEST,
  COL_SUCCESS,
  COL_ERROR,
  RESET_ERROR,
} from './constants';

const initialState = fromJS({
  error: null,
});

function visualizerReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_REQUEST: {
      console.log('action', action);
      return state;
    }
    case FETCH_SUCCESS:
      return state.set('output', action.data);

    case FETCH_ERROR: {
      console.log('action', action);
      return state.set('error', action.error);
    }

    case COL_REQUEST: {
      console.log('action', action);
      return state;
    }
    case COL_SUCCESS:
      return state.set('data', action.data);

    case COL_ERROR: {
      console.log('action', action);
      return state.set('error', action.error);
    }

    case RESET_ERROR:
      return state;
    default:
      return state;
  }
}

export default visualizerReducer;
