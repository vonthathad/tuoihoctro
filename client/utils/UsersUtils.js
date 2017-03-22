import { post } from './_requestCaller';

export function login(body) {
  console.log(body);
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
  return post({
    url: 'auth/register',
    body,
  });
}
