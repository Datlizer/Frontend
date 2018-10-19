import { call, put, take, fork } from 'redux-saga/effects';
import 'whatwg-fetch';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  URL,
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


function* signin() {
  while (true) {
    const request = yield take(LOGIN_REQUEST);
    const { password, username, history } = request.data;
    console.log(' password ', password);
    yield call(authorize, { password, username, history });
  }
}

function sendRequest({ password, username }) {
  // console.log(username, password, 'test');
  return fetch(`${URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password,
      username,
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

function* authorize({ password, username, history }) {
  let response = null;
  try {
    response = yield call(sendRequest, { password, username });
    console.log(response);
    if (response.key) {
      localStorage.setItem('token', response.key);
      yield call(forwardTo, history, '/');
      console.log('success', response.key);
    } else {
      console.log('put this', response);
      yield put({ type: LOGIN_ERROR, error: response.non_field_errors });
    }
  } catch (e) {
    yield put({ type: LOGIN_ERROR, error: e.message });
  }
}

function forwardTo(history, location) {
  history.push({
    pathname: location,
    state: {
      message: 'SigninSuccess',
    },
  });
}


// Individual exports for testing
export default function* defaultSaga() {
  yield fork(signin);
}
