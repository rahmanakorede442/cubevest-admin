import { userConstants } from '../_constants';

export function forgotpassword(state = {}, action) {
  switch (action.type) {
    case userConstants.PASSWORD_REQUEST:
      return { working: true };
    case userConstants.PASSWORD_SUCCESS:
      return {};
    case userConstants.PASSWORD_FAILURE:
      return {};
    default:
      return state
  }
}