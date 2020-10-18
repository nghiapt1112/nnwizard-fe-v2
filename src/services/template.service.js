import config from '../config';
import {authHeader, history} from '../helpers';

export const templateService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete
};

function getAll(params) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/template?${new URLSearchParams(params)}`, requestOptions).then(handleResponse);
}

function getById(tId) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/template/${tId}`, requestOptions).then(handleResponse);
}

function create(template) {
  const requestOptions = {
    method: 'POST',
    headers: {...authHeader(), 'Content-Type': 'application/json'},
    body: JSON.stringify(template)
  };

  return fetch(`${config.apiUrl}/template`, requestOptions).then(handleResponse);
}

function update(template) {
  const requestOptions = {
    method: 'PUT',
    headers: {...authHeader(), 'Content-Type': 'application/json'},
    body: JSON.stringify(template)
  };

  return fetch(`${config.apiUrl}/template/${template.tid}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(ids) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/template?${new URLSearchParams(ids)}`, requestOptions).then(handleResponse);
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
