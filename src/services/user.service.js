import axios from 'axios';
import api from './api';
import config from '../config';
import LocalStorageService from './LocalStorageService';
const localStorageService = LocalStorageService.getService();

export const userService = {
  login,
  logout,
  register,
  getProfile,
  updateProfile,
};

function login(userName, password) {
  return axios
    .post(`${config.apiUrl}/login`, { userName, password })
    .then((res) => {
      localStorageService.setToken(res.data);
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

function getProfile() {
  return api.get(`/user/profile`);
}

function register(email, password) {
  return api.post(`${config.apiUrl}/sys/register`, { email, password });
}

function updateProfile(user) {
  return api.put(`/user/profile`, user);
}
