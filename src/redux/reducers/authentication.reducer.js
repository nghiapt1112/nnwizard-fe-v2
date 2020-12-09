import { authenticationConstants } from '../_constants';
import LocalStorageService from '../../services/LocalStorageService';
const localStorageService = LocalStorageService.getService();

const exp = localStorageService.getExpiresIn();
if (exp * 1000 < Date.now()) localStorageService.clearToken();
const token = localStorageService.getAccessToken();

const initialState = token
  ? {
      loggedIn: true,
    }
  : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case authenticationConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
      };
    case authenticationConstants.LOGOUT:
      localStorageService.clearToken();
      return {};
    default:
      return state;
  }
}
