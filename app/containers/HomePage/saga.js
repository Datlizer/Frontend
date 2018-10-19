import { call, all, put, take, fork } from 'redux-saga/effects';
import 'whatwg-fetch';

import {
  FETCH_CONN_REQUEST,
  FETCH_CONN_SUCCESS,
  FETCH_CONN_ERROR,
  CONN_REQUEST,
  CONN_SUCCESS,
  CONN_ERROR,
  URL,
  CONN_URL,
} from './constants';
import { COL_SUCCESS } from 'containers/Tables/constants';


function checkStatus(response) {
  // if (response.status >= 200 && response.status < 300) {
  //   return response;
  // }
  // const error = new Error(response.statusText);
  // error.response = response;
  // throw error;
  return response;
}

function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  }
  // const error = new Error(response.statusText);
  // error.response = response.json();
  // throw error;
  return response.json();
}


function* takeReq() {
  while (true) {
    yield take(FETCH_CONN_REQUEST);
    // const { db_type,connection_name,name,address,password,username,port, history } = request.data;
    yield call(authorize, { history });
  }
}


function* takeConnReq() {
  while (true) {
    const request=yield take(CONN_REQUEST);
    const { connection_name, history } = request.data;
    yield call(connection, { connection_name, history });
  }
}


function sendRequest() {
  // console.log(username, password, 'test');
  return fetch(`${CONN_URL}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('token')}`
    }
  }).then(checkStatus).then(parseJSON);
    // .then((response) => response.json())
    // .then((json) => {
    //   console.log(json);
    // })
    // .catch((ex) => {
    //   console.log('failed', ex);
    // });
}

function sendFetchRequest({connection_name}) {
  // console.log(username, password, 'test');
  return fetch(`${URL}${connection_name}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
      connection_name
    }),
  }).then(checkStatus).then(parseJSON);
    // .then((response) => response.json())
    // .then((json) => {
    //   console.log(json);
    // })
    // .catch((ex) => {
    //   console.log('failed', ex);
    // });
}

function* authorize({ history }) {
  let response = null;
  try {
    response = yield call(sendRequest);
    console.log(response);
    if (response.length!==0) {
      console.log(response);
      // console.log(response.details);
      yield put({ type: FETCH_CONN_SUCCESS, data: response });
      // yield call(forwardTo, history, '/tables');
    } else {
      console.log('put this', response);
      yield put({ type: FETCH_CONN_ERROR, error: response.non_field_errors });
    }
  } catch (e) {
    yield put({ type: FETCH_CONN_ERROR, error: e.message });
  }
}

function* connection({ connection_name,history }) {
  let response = null;
  try {
    response = yield call(sendFetchRequest,{connection_name});
    console.log(response);
    if (response.status=="ok") {
      console.log(response);
      // console.log(response.details);
      yield put({ type: CONN_SUCCESS, data: response });
      yield put({ type: COL_SUCCESS, data: response });
      yield call(forwardTo, history, '/select');
    } else {
      console.log('put this', response);
      yield put({ type: CONN_ERROR, error: response.non_field_errors });
    }
  } catch (e) {
    yield put({ type: CONN_ERROR, error: e.message });
  }
}

function forwardTo(history, location) {
  history.push({
    pathname: location,
    state: {
      message: 'takeSuccess',
    },
  });
}


// Individual exports for testing
export default function* defaultSaga() {
  yield all([
    takeReq(),
    takeConnReq(),
  ])
}
