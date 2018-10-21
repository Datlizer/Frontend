import { call, all, put, take, fork } from 'redux-saga/effects';
import 'whatwg-fetch';

import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_ERROR,
  COL_REQUEST,
  COL_SUCCESS,
  COL_ERROR,
  URL,
  COL_URL
} from './constants';


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
    const request = yield take(FETCH_REQUEST);
    const { db_type,connection_name,name,address,password,username,port, history } = request.data;
    yield call(authorize, { db_type,connection_name,name,address,password,username,port, history });
  }
}

function* colReq() {
  while (true) {
    const request = yield take(COL_REQUEST);
    const { connection_name,col, history } = request.data;
    yield call(colFetch, { connection_name,col, history });
  }
}

function sendRequest({ db_type,connection_name,name,address,password,username,port }) {
  // console.log(username, password, 'test');
  return fetch(`${URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
      db_type,connection_name,name,address,password,username,port
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

function sendCol({ connection_name,col,port }) {
  // console.log(username, password, 'test');
  return fetch(`${COL_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
      connection_name,col
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

function* authorize({ db_type,connection_name,name,address,password,username,port, history }) {
  let response = null;
  try {
    response = yield call(sendRequest, { db_type,connection_name,name,address,password,username,port });
    console.log(response);
    if (response.status=="ok") {
      console.log(response.tables);
      console.log(response.details);
      yield put({ type: FETCH_SUCCESS, data: response });
      yield call(forwardTo, history, '/tables');
    } else {
      console.log('put this', response);
      yield put({ type: FETCH_ERROR, error: response.non_field_errors });
    }
  } catch (e) {
    yield put({ type: FETCH_ERROR, error: e.message });
  }
}

function* colFetch({ connection_name,col, history }) {
  let response = null;
  try {
    response = yield call(sendCol, { connection_name,col });
    console.log("sadsaaaa",response);
    if (response[0].status=="ok") {
      console.log(response);
      yield put({ type: COL_SUCCESS, data: response });
      yield call(forwardTo, history, '/display');
    } else {
      console.log('put this', response);
      yield put({ type: COL_ERROR, error: response.non_field_errors });
    }
  } catch (e) {
    yield put({ type: COL_ERROR, error: e.message });
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
  yield fork(takeReq);
  yield all([
    takeReq(),
    colReq(),
  ])
}
