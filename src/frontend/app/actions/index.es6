import { createAction } from 'redux-actions';

import * as rest from 'lib/rest';

import { resetAuth } from 'actions/auth';
export { authenticate, checkToken, resetAuth } from 'actions/auth';

const endpoints = require('endpoints');

export const FETCH_USERS = 'FETCH_USERS';
export const DELETE_USER = 'DELETE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const ADD_USER = 'ADD_USER';
export const FETCH_DOORS = 'FETCH_DOORS';
export const DELETE_DOOR = 'DELETE_DOOR';
export const UPDATE_DOOR = 'UPDATE_DOOR';
export const FETCH_QRCODE = 'FETCH_QRCODE';

export function fetchUsers(token) {
  return dispatch => {
    const action = createAction('FETCH_USERS');
    const url = `${endpoints.base}${endpoints.get.adminUsers}`;
    rest.get(url, token).then(data => {
      dispatch(action({ status: 'done', data }));
    }).catch(err => {
      dispatch(resetAuth(err));
    });
  };
}

export function fetchQRCode(id, token) {
  return dispatch => {
    const action = createAction('FETCH_QRCODE');
    const url = `${endpoints.base}${endpoints.get.adminQRCode}/${id}`;
    rest.get(url, token).then(data => {
      dispatch(action(data.qrcode));
    });
  };
}

export function addUser(user, token) {
  return dispatch => {
    const action = createAction('ADD_USER');
    const url = `${endpoints.base}${endpoints.post.user}`;
    rest.post(url, { user }, token).then(() => {
      dispatch(action(user));
    });
  };
}

export function updateUser(user, token) {
  return dispatch => {
    const action = createAction('UPDATE_USER');
    const url = `${endpoints.base}${endpoints.update.user}/${user.id}`;
    rest.update(url, { user }, token).then(() => {
      dispatch(action(user));
    });
  };
}

export function deleteUser(id, token) {
  return dispatch => {
    const action = createAction('DELETE_USER');
    const url = `${endpoints.base}${endpoints.delete.user}/${id}`;
    rest.del(url, token).then(() => {
      dispatch(action(id));
    });
  };
}

export function deleteDoor(id, token) {
  return dispatch => {
    const action = createAction('DELETE_DOOR');
    const url = `${endpoints.base}${endpoints.delete.door}/${id}`;
    rest.del(url, token).then(() => {
      dispatch(action(id));
    });
  };
}

export function updateDoor(door, token) {
  return dispatch => {
    const action = createAction('UPDATE_DOOR');
    const url = `${endpoints.base}${endpoints.update.door}/${door.id}`;
    rest.update(url, { door }, token).then(() => {
      dispatch(action(door));
    });
  };
}

export function fetchDoors(token) {
  return dispatch => {
    const action = createAction('FETCH_DOORS');
    const url = `${endpoints.base}${endpoints.get.adminDoors}`;
    rest.get(url, token).then(data => {
      dispatch(action({ status: 'done', data }));
    }).catch(err => {
      dispatch(resetAuth(err));
    });
  };
}
