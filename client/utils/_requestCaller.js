import fetch from 'isomorphic-fetch';
// import Config from '../../server/configs/server.config';

// export const BASE_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
//   process.env.baseUrl || (`http://localhost:${process.env.PORT || Config.port}`) :
//   'http://localhost:4000';
export const BASE_URL = (process.env.NODE_ENV === 'development' || typeof(window) !== 'undefined' && window.location.href.indexOf('localhost') !== -1) ?
  'http://localhost:4000' : 'http://tuoihoctro.co';

function request(options) {
  // console.log(1235);
  // set partial url to full url
  // options.url = `${baseUrl}${options.url}`;
  options.url = `${BASE_URL}/${options.url}`;
  // stringify body from json to string
  // options.body = JSON.stringify(options.body);
  // add default header if there are no header
  // if (!options.headers) options.headers = new Headers({ 'Content-Type': 'application/json' });
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
        if (res.Body) throw res.Body.statusText;
        else throw Object({ error: 'Lỗi' });
      }
      return res.json();
    });
}

export function post(options) {
  // console.log(options);
  options.method = 'post';
  return request(options);
}

export function get(options) {
  options.method = 'get';
  return request(options);
}

export function put(options) {
  options.method = 'put';
  return request(options);
}

export function _delete(options) {
  options.method = 'delete';
  return request(options);
}
