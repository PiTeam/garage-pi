import { handleActions } from 'redux-actions';
import fromJS from 'lib/struct';

const initialAuthState = fromJS({});

const authReducers = handleActions({
  SET_AUTH: (state, action) => fromJS(action.payload),
  RESET_AUTH: () => initialAuthState,
}, initialAuthState);

export default authReducers;
