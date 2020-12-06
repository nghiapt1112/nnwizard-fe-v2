import api from "./api";

export const masterDataService = {
    getAll,
    findById,
    create,
    update,
    delete: _delete
};
const MASTER_DATA_PATH = '/setting';

function getAll(params) {
    return api(`${MASTER_DATA_PATH}?${new URLSearchParams(params)}`);
}

function findById(tId) {
    return api.get(`${MASTER_DATA_PATH}/${tId}`);
}

function create(payload) {
    return api.post(`${MASTER_DATA_PATH}`, payload);
}

function update(id, payload) {
    return api.put(`${MASTER_DATA_PATH}/${id}`, payload);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(params) {
    return api.delete(`${MASTER_DATA_PATH}?${new URLSearchParams(params)}`);
}
