import fetch from 'isomorphic-fetch';
import Config from '../../server/configs/server.config';

export const API_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
  process.env.BASE_URL || (`http://localhost:${process.env.PORT || Config.port}/api`) :
  '/api';

export default function request(endpoint, headers, method = 'get', body) {
  return fetch(`${API_URL}/${endpoint}`, {
    headers,
    method,
    body: body ? body.post : null,
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }
    return json;
  })
  .then(
    response => response,
    error => error
  );
}
