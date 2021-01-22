import { authenticationConstants } from '../_constants';

export const authenticationAction = {
  loginSuccess,
  getUserInfoSuccess,
  logout,
};

function loginSuccess() {
  return {
    type: authenticationConstants.LOGIN_SUCCESS,
  };
}

function getUserInfoSuccess(payload) {
  return {
    type: authenticationConstants.GET_USER_INFO_SUCCESS,
    payload,
  };
}

function logout() {
  return {
    type: authenticationConstants.LOGOUT,
  };
}
