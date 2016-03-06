import { handleActions } from 'redux-actions';
import immutable from 'immutable';

const initialAuthState = immutable.fromJS({});

const authReducers = handleActions({
  SET_AUTH: (state, action) => immutable.fromJS(action.payload),
  RESET_AUTH: () => initialAuthState,
}, initialAuthState);

export default authReducers;
