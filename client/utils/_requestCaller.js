import fetch from 'isomorphic-fetch';
import Config from '../../server/configs/server.config';

export const BASE_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
  process.env.baseUrl || (`http://localhost:${process.env.PORT || Config.port}`) :
  '';

function request(options) {
  // set partial url to full url
  // options.url = `${baseUrl}${options.url}`;
  options.url = `${BASE_URL}/${options.url}`;
  // stringify body from json to string
  options.body = JSON.stringify(options.body);
  // add default header if there are no header
  if (!options.headers) options.headers = new Headers({ 'Content-Type': 'application/json' });
  // add params to query params
  if (options.queryArgs) {
    // pour object properties to array
    const queryArgsArray = [];
    Object.keys(options.queryArgs).forEach((param) => {
      queryArgsArray.push(`${param}=${options.queryArgs[param]}`);
    });
    // connect array componet with '&' then connect with full url
    options.url = `${options.url}?${queryArgsArray.join('&')}`;
  }
  // send request and return observable
  // return this.http.request(req);
  return fetch(options.url, { ...options })
    .then(res => {
      if (res.status !== 200) {
        throw res.Body.statusText;
      }
      return res.json();
    });
}

// ////////////////////////////////////////////////
// //TO POST
// ////////////////////////////////////////////////
export function post(options) {
  options.method = 'post';
  return request(options);
}

// ////////////////////////////////////////////////
// //TO GET
// ////////////////////////////////////////////////
export function get(options) {
  options.method = 'get';
  return request(options);
}

// ////////////////////////////////////////////////
// //TO PUT
// ////////////////////////////////////////////////
export function put(options) {
  options.method = 'put';
  return request(options);
}

// ////////////////////////////////////////////////
// //TO DELETE
// ////////////////////////////////////////////////
export function _delete(options) {
  options.method = 'delete';
  return request(options);
}