import {authenticationConstants} from "../_constants";

export const authenticationAction = {
  loginSuccess,
  logout,
};

function loginSuccess(payload) {
  return {
    type: authenticationConstants.LOGIN_SUCCESS,
    payload
  }
}

function logout() {
  return {
    type: authenticationConstants.LOGOUT,
  }
}
