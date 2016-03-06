import { combineReducers } from 'redux';

import doorReducers from 'reducers/door';
import userReducers from 'reducers/user';
import authReducers from 'reducers/auth';

const rootReducer = combineReducers({
  doors: doorReducers,
  users: userReducers,
  auth: authReducers,
});

export default rootReducer;
