import axios from 'axios';
import config from '../config';
import LocalStorageService from './LocalStorageService';

const localStorageService = LocalStorageService.getService();

const api = axios.create({
  baseURL: config.apiUrl,
  // timeout: 1000,
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorageService.getAccessToken();
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//Add a response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  function (error) {
    try {
      const originalRequest = error.config;
      if (
        error.response.status === 401 &&
        originalRequest.url === `${config.apiUrl}/login`
      ) {
        window.location.href = '/login';
        return Promise.reject(error);
      }

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorageService.getRefreshToken();
        return axios
          .post(`${config.apiUrl}/refresh?refreshToken=${refreshToken}`)
          .then((res) => {
            if (res.status === 200) {
              localStorageService.setToken(res.data);
              api.defaults.headers.common['Authorization'] =
                'Bearer ' + localStorageService.getAccessToken();
              return api(originalRequest);
            }
          })
          .catch((error) => {
            localStorageService.clearToken();
            window.location.href = '/login';
            return Promise.reject(error);
          });
      }

      if (error.response.status === 403) {
        return Promise.reject('Forbidden');
      }
      const {
        response: { data, statusText },
      } = error;
      const erMessage =
        (data && data.message) ||
        (data.messages && data.messages[0]) ||
        statusText;
      return Promise.reject(erMessage);
    } catch (error) {
      return Promise.reject('ERROR');
    }
  }
);

export default api;
