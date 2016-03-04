import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import _ from 'lodash';
import immutable from 'immutable';

const initialDoorState = immutable.fromJS({});
const initialUserState = immutable.fromJS({ data: [] });
const initialAuthState = immutable.fromJS({ data: [] });

const rootReducer = combineReducers({
  doors: handleActions({
    RESET_AUTH: () => initialDoorState,
    FETCH_DOORS: (state, action) => immutable.fromJS(action.payload),
    DELETE_DOOR: (state, action) => (
      state.set('data',
                state.data.filter(door => door.id !== action.payload))
    ),
    FETCH_USER_DOORS: (state, action) => immutable.fromJS(action.payload),
    UPDATE_DOOR: (state, action) => {
      const replace = state.get('data').find(el => el.id === action.payload.id);
      state.updateIn(['data', replace], () => action.payload);
    },
    ADD_USER: (state, action) => {
      const user = action.payload;
      const newstate = Object.assign({}, state);
      newstate.data = state.data.map(door => {
        const position = user.doors.indexOf(door.id);
        if (position >= 0 && door.users.indexOf(user.id) === -1) {
          door.users.push(user.id);
        } else if (door.users.indexOf(user.id) !== -1) {
          door.users.splice(position, 1);
        }
        return door;
      });
      return newstate;
    },
    UPDATE_USER: (state, action) => {
      const user = action.payload;
      const newstate = Object.assign({}, state);
      newstate.data = state.data.map(door => {
        const position = user.doors.indexOf(door.id);
        if (position >= 0 && door.users.indexOf(user.id) === -1) {
          door.users.push(user.id);
        } else if (door.users.indexOf(user.id) !== -1) {
          door.users.splice(position, 1);
        }
        return door;
      });
      return newstate;
    },
    DELETE_USER: (state, action) => {
      const user = action.payload;
      const newstate = Object.assign({}, state);
      newstate.data = state.data.map(door => {
        const position = user.doors.indexOf(door.id);
        if (position >= 0 && door.users.indexOf(user.id) === -1) {
          door.users.push(user.id);
        } else if (door.users.indexOf(user.id) !== -1) {
          door.users.splice(position, 1);
        }
        return door;
      });
      return newstate;
    },
  }, initialDoorState),
  users: handleActions({
    RESET_AUTH: () => initialUserState,
    ADD_USER: (state, action) => action.payload,
    FETCH_USERS: (state, action) => immutable.fromJS(action.payload),
    DELETE_USER: (state, action) => {
      const index = _.findIndex(state.data, { id: action.payload });
      const arr = state.data.slice(0, index).concat(state.data.slice(index + 1));
      return { status: 'done', data: arr };
    },
    UPDATE_USER: (state, action) => {
      const index = _.findIndex(state.data, { id: action.payload.id });
      const arr = state.data;
      return state.set('data', [
        ...arr.slice(0, index),
        action.payload,
        ...arr.slice(index + 1),
      ]);
    },
    ACTIVATE_USER: (state, action) => {
      const index = _.findIndex(state.data, { id: action.payload.id });
      const arr = state.data;
      return { status: 'done', data: [
        ...arr.slice(0, index),
        action.payload,
        ...arr.slice(index + 1),
      ] };
    },
    ADD_DOOR: (state, action) => {
      const door = action.payload;
      const newstate = Object.assign({}, state);
      newstate.data = state.data.map(user => {
        const position = door.users.indexOf(user.id);
        if (position >= 0 && user.doors.indexOf(door.id) === -1) {
          user.doors.push(door.id);
        } else if (user.doors.indexOf(door.id) !== -1) {
          user.doors.splice(position, 1);
        }
        return user;
      });
      return newstate;
    },
    UPDATE_DOOR: (state, action) => {
      const door = action.payload;
      const newstate = Object.assign({}, state);
      newstate.data = state.data.map(user => {
        const position = door.users.indexOf(user.id);
        if (position >= 0 && user.doors.indexOf(door.id) === -1) {
          user.doors.push(door.id);
        } else if (user.doors.indexOf(door.id) !== -1) {
          user.doors.splice(position, 1);
        }
        return user;
      });
      return newstate;
    },
    DELETE_DOOR: (state, action) => {
      const door = action.payload;
      const newstate = Object.assign({}, state);
      newstate.data = state.data.map(user => {
        const position = door.users.indexOf(user.id);
        if (position >= 0 && user.doors.indexOf(door.id) === -1) {
          user.doors.push(door.id);
        } else if (user.doors.indexOf(door.id) !== -1) {
          user.doors.splice(position, 1);
        }
        return user;
      });
      return newstate;
    },
  }, initialUserState),
  auth: handleActions({
    SET_AUTH: (state, action) => immutable.fromJS(action.payload),
    RESET_AUTH: () => initialAuthState,
  }, initialAuthState),
});

export default rootReducer;
