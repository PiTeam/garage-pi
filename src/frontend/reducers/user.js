import { handleActions } from 'redux-actions';
import immutable from 'immutable';

const initialUserState = immutable.fromJS({});

const userReducers = handleActions({
  RESET_AUTH: () => initialUserState,
  ADD_USER: (state, action) => (
    state.set('data', state.get('data').push(action.payload))
  ),
  FETCH_USERS: (state, action) => immutable.fromJS(action.payload),
  DELETE_USER: (state, action) => (
    state.set('data', state.get('data').filter(user => user.get('id') !== action.payload.get('id')))
  ),
  UPDATE_USER: (state, action) => (
    state.set('data', state.get('data').map(user => {
      if (user.get('id') === action.payload.get('id')) {
        return action.payload;
      }
      return user;
    }))
  ),
  ADD_DOOR: (state, action) => {
    const door = action.payload;
    const data = state.get('data').map(user => {
      if (door.get('users').indexOf(user.get('id')) !== -1) {
        return user.set('doors', user.get('doors').push(door.get('id')));
      }
      return user;
    });
    return state.set('data', data);
  },
  UPDATE_DOOR: (state, action) => {
    const door = action.payload;
    const data = state.get('data').map(user => {
      const index = user.get('doors').indexOf(door.get('id'));
      if (door.get('users').indexOf(user.get('id')) === -1 && index !== -1) {
        return user.set('doors', user.get('doors').delete(index));
      } else if (door.get('users').indexOf(user.get('id')) !== -1 && index === -1) {
        return user.set('doors', user.get('doors').push(door.get('id')));
      }
      return user;
    });
    return state.set('data', data);
  },
  DELETE_DOOR: (state, action) => {
    const door = action.payload;
    const data = state.get('data').map(user => {
      const index = user.get('doors').indexOf(door.get('id'));
      if (index !== -1) {
        return user.set('doors', user.get('doors').delete(index));
      }
      return user;
    });
    return state.set('data', data);
  },
}, initialUserState);

export default userReducers;
