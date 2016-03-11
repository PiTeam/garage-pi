import { handleActions } from 'redux-actions';
import fromJS from 'lib/struct';

const initialDoorState = fromJS({});

const doorReducers = handleActions({
  RESET_AUTH: () => initialDoorState,
  FETCH_DOORS: (state, action) => fromJS(action.payload),
  DELETE_DOOR: (state, action) => (
    state.set('data', state.get('data').filter(door => door.id !== action.payload))
  ),
  FETCH_USER_DOORS: (state, action) => fromJS(action.payload),
  UPDATE_DOOR: (state, action) => (
    state.set('data', state.get('data').map(door => {
      if (door.get('id') === action.payload.get('id')) {
        return action.payload;
      }
      return door;
    }))
  ),
  ADD_USER: (state, action) => {
    const user = action.payload;
    const data = state.get('data').map(door => (
      door.set('users', door.get('users').push(user.get('id')))
    ));
    return state.set('data', data);
  },
  UPDATE_USER: (state, action) => {
    const user = action.payload;
    const data = state.get('data').map(door => {
      if (user.get('doors').indexOf(door.get('id')) === -1) {
        return door.set('users', door.get('users').delete(door.get('id')));
      } else if (user.get('doors').indexOf(door.get('id')) !== -1) {
        return door.set('users', door.get('users').push(user.get('id')));
      }
      console.log(door.get('users'));
      return door;
    });
    return state.set('data', data);
  },
  DELETE_USER: (state, action) => {
    const user = action.payload;
    const data = state.get('data').map(door => {
      const index = door.get('users').indexOf(user.get('id'));
      if (index !== -1) {
        return door.set('users', door.get('users').delete(index));
      }
      return door;
    });
    return state.set('data', data);
  },
}, initialDoorState);

export default doorReducers;
