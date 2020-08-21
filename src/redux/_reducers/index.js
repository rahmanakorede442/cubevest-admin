import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { forgotpassword } from './forgotpassword.reducer';
import { savings } from './savings.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  forgotpassword,
  users,
  alert,
  savings
});

export default rootReducer;