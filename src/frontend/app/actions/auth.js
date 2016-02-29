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
          localStorage.setItem('token',
            JSON.stringify({ admin: data.admin, value: data.token.value }));
        }
        dispatch(loginAction(data));
      });
    });
  };
}

export function processActivateUser(activateToken) {
  return dispatch => {
    const url = `${endpoints.base}${endpoints.post.activateTokenAuth}`;
    const loginAction = createAction('LOGIN_ACTION');

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ activateToken }),
    }).then(res => {
      if (res.status !== 200) {
        dispatch(loginAction({ error: true, message: 'Can\'t contact auth server' }));
        return;
      }

      res.json().then(data => {
        if (data.token) {
          localStorage.setItem('token',
            JSON.stringify({ admin: false, value: data.token.value }));
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

    const token = localStorage.token ? JSON.parse(localStorage.token) : {};
    if (token.value) {
      auth = {
        token: {
          status: 'valid',
          value: token.value,
        },
        admin: token.admin,
      };
    } else {
      auth = {
        token: {
          status: 'invalid',
        },
        admin: false,
      };
    }

    return dispatch(tokenActive(auth));
  };
}

export function resetAuth() {
  return dispatch => {
    const resetAuthAction = createAction('RESET_AUTH');
    const resetDoors = createAction('RESET_DOORS');
    const resetUsers = createAction('RESET_USERS');
    localStorage.removeItem('token');
    dispatch(resetAuthAction({
      token: {
        status: 'init',
        value: undefined,
      },
    }));
    dispatch(resetUsers());
    dispatch(resetDoors());
  };
}
