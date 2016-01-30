import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import _ from 'lodash';

const rootReducer = combineReducers({
  doors: handleActions({
    FETCH_DOORS: (state=[], action) => action.payload,
    DELETE_DOOR: (state=[], action) => {
      const index = _.findIndex(state.data, { id: action.payload });
      const arr = state.data.slice(0, index).concat(state.data.slice(index + 1));
      return { status: 'done', data: arr };
    },
    UPDATE_DOOR: (state=[], action) => {
      const index = _.findIndex(state.data, { id: action.payload.id });
      const arr = state.data;
      return { status: 'done', data: [
        ...arr.slice(0, index),
        action.payload,
        ...arr.slice(index + 1),
      ] };
    },
  }, { status: 'init', data: [] }),
  qrcode: handleActions({
    FETCH_QRCODE: (state={}, action) => action.payload,
  }, ''),
  users: handleActions({
    ADD_USER: (state=[], action) => action.payload,
    FETCH_USERS: (state=[], action) => action.payload,
    DELETE_USER: (state=[], action) => {
      const index = _.findIndex(state.data, { id: action.payload });
      const arr = state.data.slice(0, index).concat(state.data.slice(index + 1));
      return { status: 'done', data: arr };
    },
    UPDATE_USER: (state=[], action) => {
      const index = _.findIndex(state.data, { id: action.payload.id });
      const arr = state.data;
      return { status: 'done', data: [
        ...arr.slice(0, index),
        action.payload,
        ...arr.slice(index + 1),
      ] };
    },
  }, { status: 'init', data: [] }),
  auth: handleActions({
    LOGIN_ACTION: (state={}, action) => {
      if (!action.payload) {
        return state;
      }
      return action.payload;
    },
    CHECK_TOKEN: (state={}, action) => {
      if (!action.payload) {
        return state;
      }
      return action.payload;
    },
    REMOVE_TOKEN: (state={}, action) => {
      if (!action.payload) {
        return state;
      }
      return action.payload;
    },
  }, { token: { status: 'init' } }),
});

export default rootReducer;
