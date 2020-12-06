import api from "./api";
import config from "../config";
import LocalStorageService from './LocalStorageService';
const localStorageService = LocalStorageService.getService();

const API_PATH = '/sys/users';
export const adminUserService = {
    findAllUsers,
    findDetail,
    create,
    update
};

function findAllUsers() {
    return api.get(`${API_PATH}`);
}

function create(payload) {
    return api.post(`${API_PATH}`, payload)
}

function update(id, payload) {
    return api.put(`${API_PATH}/${id}`, payload)
}

function findDetail(id) {
    return api.get(`${API_PATH}/${id}`,);
}

function updateProfile(user) {
    return api.put(`/user/profile`, user);
}
