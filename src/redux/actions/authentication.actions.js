import {authenticationConstants} from "../_constants";

export const authenticationAction = {
  loginSuccess,
  logout,
};

function loginSuccess() {
  return {
    type: authenticationConstants.LOGIN_SUCCESS
  }
}

function logout() {
  return {
    type: authenticationConstants.LOGOUT,
  }
}
