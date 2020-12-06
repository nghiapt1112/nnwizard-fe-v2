import api from "./api";
import config from "../config";

const API_PATH = '/sys/roles';
export const adminRoleService = {
    findAllRoles,
    findDetail
};

function findAllRoles() {
    return api.get(`${API_PATH}`);
}

function findDetail(email, password) {
    return api.post(`${config.apiUrl}/sys/register`, {email, password});
}

function updateProfile(user) {
    return api.put(`/user/profile`, user);
}
