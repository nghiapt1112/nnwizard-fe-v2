import axios from 'axios';
import api from "./api";

export const orderService = {
  getAll,
  getById,
  create,
  update,
  generateLinkUploadFile,
  uploadFile,
  delete: _delete
};

function getAll(params) {
  return api(`/order?${new URLSearchParams(params)}`);
}

function getById(tId) {
  return api.get(`/order/${tId}`);
}

function create(order) {
  return api.post(`/order`, order);
}

function update(orderId, order) {
  return api.put(`/order/real-estate-setting/${orderId}`,order);
}

function generateLinkUploadFile(payload) {
  return api.post(`/storage/sign-url`, payload);
}

function uploadFile(preSignedURL, blob, data) {
  return axios.put(preSignedURL, blob, {
    method: 'PUT',
    headers: {
      'Content-Type': base64MimeType(data),
      'Access-Control-Allow-Origin': '*'
    }
  });
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return api.delete(`/order/${id}`);
}

function base64MimeType(encoded) {
  var result = null;

  if (typeof encoded !== 'string') {
    return result;
  }

  var mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

  if (mime && mime.length) {
    result = mime[1];
  }

  return result;
}
