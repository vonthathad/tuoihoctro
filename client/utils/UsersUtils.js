import { post } from './_requestCaller';

export function login(body) {
  const headers = {
    'Content-type': 'application/json',
  };
  return post({
    url: 'auth/login',
    body: JSON.stringify(body.user),
    headers
  });
}

export function register(body) {
  const headers = {
    'Content-type': 'application/json',
  };
  return post({
    url: 'auth/register',
    body: JSON.stringify(body.user),
    headers
  });
}
