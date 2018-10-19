/*
 *
 * SignupPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  FETCH_CONN_REQUEST,
  FETCH_CONN_SUCCESS,
  FETCH_CONN_ERROR,
  CONN_REQUEST,
  CONN_SUCCESS,
  CONN_ERROR,
  RESET_ERROR,
} from './constants';


const initialState = fromJS({
  error: null,
});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CONN_REQUEST: {
      console.log('action', action);
      return state;
    }
    case FETCH_CONN_SUCCESS:
      return state.set('connections', action.data);

    case FETCH_CONN_ERROR: {
      console.log('action', action);
      return state.set('error', action.error);
    }

    case CONN_REQUEST: {
      console.log('action', action);
      return state;
    }
    case CONN_SUCCESS:
      return state.set('output', action.data);

    case CONN_ERROR: {
      console.log('action', action);
      return state.set('error', action.error);
    }

    case RESET_ERROR:
      return state;
    default:
      return state;
  }
}

export default homePageReducer;
