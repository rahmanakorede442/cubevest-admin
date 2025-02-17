import { userConstants } from '../_constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {isValidUser:false};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
        isValidUser:true
      };
    case userConstants.LOGIN_FAILURE:
      return {
        loggedIn: false,};
    case userConstants.LOGOUT:
      return {isValidUser:false};
    default:
      return state
  }
}