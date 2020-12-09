import api from './api';

export const templateService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

function getAll(params) {
  return api.get(`/template?${new URLSearchParams(params)}`);
}

function getById(tId) {
  return api.get(`/template/${tId}`);
}

function create(template) {
  return api.post(`/template`, template);
}

function update(template) {
  return api.put(`/template/${template.tid}`, template);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(ids) {
  return api.delete(`/template?${new URLSearchParams(ids)}`);
}
