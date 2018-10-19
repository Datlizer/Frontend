import { call, put, take, fork } from 'redux-saga/effects';
import 'whatwg-fetch';

import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
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


function* signup() {
  while (true) {
    const request = yield take(SIGNUP_REQUEST);
    const { username, password1, password2, history } = request.data;
    yield call(authorize, { username, password1, password2, history });
  }
}

function sendRequest({ username, password1, password2 }) {
  // console.log(username, password, 'test');
  return fetch(`${URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password1,
      password2,
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


/*eslint-disable */
function* authorize({ username, password1, password2, history }) {
  let response = null;
  try {
    response = yield call(sendRequest, { username, password1, password2 });
    console.log(response);
    if (response.key) {
      localStorage.setItem('token', response.key);
      const signupSuccessResponse = yield put({ type: SIGNUP_SUCCESS });
      yield call(forwardTo, history, '/');
      if (signupSuccessResponse) {
        yield put({ type: SUCCESS_MESSAGE,data:'Signup Success' });
      }
      console.log('success', response.key);
    } else {
      console.log('response is ', response);
      yield put({ type: SIGNUP_ERROR, error: response });
    }
  } catch (e) {
    yield put({ type: SIGNUP_ERROR, error: e.message });
  }
}
/*eslint-enable */
function forwardTo(history, location) {
  history.push({
    pathname: location,
    state: {
      message: 'Signup Success',
    },
  });
}


// Individual exports for testing
export default function* defaultSaga() {
  yield fork(signup);
}
