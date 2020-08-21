import { userConstants } from '../_constants';

export function savings(state = {}, action) {
  switch (action.type) {
    case userConstants.SAVINGS_REQUEST:
      return { savings: true };
    case userConstants.SAVINGS_SUCCESS:
      return {};
    case userConstants.SAVINGS_FAILURE:
      return {};
    default:
      return state
  }
}