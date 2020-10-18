import config from '../config';
import {authHeader, history} from '../helpers';

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
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/order?${new URLSearchParams(params)}`, requestOptions).then(handleResponse);
}

function getById(tId) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/order/${tId}`, requestOptions).then(handleResponse);
}

function create(order) {
  const requestOptions = {
    method: 'POST',
    headers: {...authHeader(), 'Content-Type': 'application/json'},
    body: JSON.stringify(order)
  };

  return fetch(`${config.apiUrl}/order`, requestOptions).then(handleResponse);
}

function update(orderId, order) {
  const requestOptions = {
    method: 'PUT',
    headers: {...authHeader(), 'Content-Type': 'application/json'},
    body: JSON.stringify(order)
  };

  return fetch(`${config.apiUrl}/order/real-estate-setting/${orderId}`, requestOptions).then(handleResponse);
}

function generateLinkUploadFile(payload) {
  const requestOptions = {
    method: 'POST',
    headers: {...authHeader(), 'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  };

  return fetch(`${config.apiUrl}/storage/sign-url`, requestOptions).then(handleResponse);
}

function uploadFile(preSignedURL, blob, data) {
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': base64MimeType(data),
      'Access-Control-Allow-Origin': '*'
    },
    body: blob
  };

  return fetch(preSignedURL, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/order/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        history.push('/login');
      }
      const error = ((data && data.message) || (data.messages && data.messages[0])) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
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

function b64toBlob(dataURI) {

  var byteString = atob(dataURI.split(',')[1]);
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);

  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], {type: base64MimeType(dataURI)});
}
