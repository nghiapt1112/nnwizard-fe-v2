import {authenticationConstants} from '../_constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? {
  loggedIn: true,
  user
} : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case authenticationConstants.LOGIN_SUCCESS:
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        loggedIn: true,
        user: action.payload
      };
    case authenticationConstants.LOGOUT:
      localStorage.removeItem('user');
      return {};
    default:
      return state
  }
}
