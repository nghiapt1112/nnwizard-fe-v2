import api from './api';

export const settingService = {
  getAll,
};

function getAll(params) {
  return api.get(`/setting?${new URLSearchParams(params)}`);
}
