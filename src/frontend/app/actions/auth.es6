import { createAction } from 'redux-actions';

const endpoints = require('endpoints');
export const LOGIN_ACTION = 'LOGIN_ACTION';
export const RESET_AUTH = 'RESET_AUTH';
export const CHECK_TOKEN = 'CHECK_TOKEN';

export function authenticate(authdata) {
  return dispatch => {
    const url = `${endpoints.base}${endpoints.post.auth}`;
    const loginAction = createAction('LOGIN_ACTION');

    if (!authdata) {
      return;
    }

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authdata),
    }).then(res => {
      if (res.status !== 200) {
        dispatch(loginAction({ error: true, message: 'Can\'t contact auth server' }));
        return;
      }

      res.json().then(data => {
        if (data.token) {
          localStorage.setItem('token', data.token.value);
        }
        dispatch(loginAction(data));
      });
    });
  };
}

export function checkToken() {
  return dispatch => {
    const tokenActive = createAction('CHECK_TOKEN');
    let auth = {};

    if (localStorage.token) {
      auth = {
        token: {
          status: 'valid',
          value: localStorage.token,
        },
      };
    } else {
      auth = {
        token: {
          status: 'invalid',
        },
      };
    }

    return dispatch(tokenActive(auth));
  };
}

export function resetAuth() {
  return dispatch => {
    const resetAuthAction = createAction('RESET_AUTH');
    if (localStorage.token) {
      localStorage.removeItem('token');
      dispatch(resetAuthAction({
        token: {
          status: 'init',
          value: undefined,
        },
      }));
    }
  };
}
