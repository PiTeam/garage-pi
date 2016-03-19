import { createAction } from 'redux-actions';
import * as rest from 'lib/rest';
import { resetAuth } from 'actions/auth';

const endpoints = require('endpoints');

export const FETCH_DOORS = 'FETCH_DOORS';
export const DELETE_DOOR = 'DELETE_DOOR';
export const UPDATE_DOOR = 'UPDATE_DOOR';

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
    const url = `${endpoints.base}${endpoints.update.door}/${door.get('id')}`;
    rest.update(url, { door: door.toJS() }, token).then(() => {
      dispatch(action(door));
    });
  };
}

export function fetchDoors(token) {
  return dispatch => {
    const action = createAction('FETCH_DOORS');
    const url = `${endpoints.base}${endpoints.get.adminDoors}`;
    rest.get(url, token).then(data => {
      dispatch(action({ status: 'success', data }));
    }).catch(err => {
      dispatch(resetAuth(err));
    });
  };
}
