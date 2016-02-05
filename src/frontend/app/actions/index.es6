import { createAction } from 'redux-actions';

import * as rest from 'lib/rest';

import { resetAuth } from 'actions/auth';
export { authenticate, checkToken, resetAuth, processActivateUser } from 'actions/auth';

const endpoints = require('endpoints');

export const FETCH_USERS = 'FETCH_USERS';
export const DELETE_USER = 'DELETE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const RESET_USERS = 'RESET_USERS';
export const ADD_USER = 'ADD_USER';
export const FETCH_DOORS = 'FETCH_DOORS';
export const FETCH_USER_DOORS = 'FETCH_USER_DOORS';
export const DELETE_DOOR = 'DELETE_DOOR';
export const UPDATE_DOOR = 'UPDATE_DOOR';
export const RESET_DOORS = 'RESET_DOORS';
export const ACTIVATE_USER = 'ACTIVATE_USER';

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

export function fetchUserDoors(token) {
  return dispatch => {
    const action = createAction('FETCH_USER_DOORS');
    const url = `${endpoints.base}${endpoints.get.doors}`;
    rest.get(url, token).then(data => {
      dispatch(action({ status: 'done', data }));
    }).catch(err => {
      dispatch(resetAuth(err));
    });
  };
}

export function activateUser(id) {
  return dispatch => {
    const action = createAction('ACTIVATE_USER');
    const url = `${endpoints.base}${endpoints.update.activateUser}/${id}`;
    rest.update(url).then(data => {
      dispatch(action(data));
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
