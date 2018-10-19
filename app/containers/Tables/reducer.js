/*
 *
 * SignupPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  COL_REQUEST,
  COL_SUCCESS,
  COL_ERROR,
  RESET_ERROR,
} from './constants';

const initialState = fromJS({
  error: null,
});

function tablesReducer(state = initialState, action) {
  switch (action.type) {
    case COL_REQUEST: {
      console.log('action', action);
      return state;
    }
    case COL_SUCCESS:{
      console.log("boi",action.data);
      return state.set('data', action.data);
    }


    case COL_ERROR: {
      console.log('action', action);
      return state.set('error', action.error);
    }

    case RESET_ERROR:
      return state;
    case 'app/HomePage/CONN_SUCCESS':
      console.log("Awesome", action);
    default:
      return state;
  }
}

export default tablesReducer;
