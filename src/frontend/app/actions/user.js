import { createAction } from 'redux-actions';
import * as rest from 'lib/rest';
import { resetAuth } from 'actions/auth';
import fromJS from 'lib/immutable';

const endpoints = require('endpoints');

export const FETCH_USERS = 'FETCH_USERS';
export const DELETE_USER = 'DELETE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const ADD_USER = 'ADD_USER';
export const FETCH_USER_DOORS = 'FETCH_USER_DOORS';

export function fetchUsers(token) {
  return dispatch => {
    const action = createAction('FETCH_USERS');
    const url = `${endpoints.base}${endpoints.get.adminUsers}`;
    rest.get(url, token).then(data => {
      dispatch(action({ status: 'success', data }));
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
      dispatch(action({ status: 'success', data }));
    }).catch(err => {
      dispatch(resetAuth(err));
    });
  };
}

export function activateUser(user) {
  return dispatch => {
    const action = createAction('UPDATE_USER');
    const url = `${endpoints.base}${endpoints.update.activateUser}/${user.get('id')}`;
    rest.update(url).then(data => {
      dispatch(action(fromJS(data.user)));
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
    const url = `${endpoints.base}${endpoints.update.user}/${user.get('id')}`;
    rest.update(url, { user: user.toJS() }, token).then(() => {
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
