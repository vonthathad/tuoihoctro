import { get, post } from './_requestCaller';

export function getPosts(queryArgs) {
  const headers = {
    'Content-type': 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNpcmRhdDE5OTNAZ21haWwuY29tIiwiaWF0IjoxNDg3NzY4MTE3fQ.Ds8JI_moMH9-UzuS38p1zGWirYNM89uadhV8RsShTjg',
  };
  return get({
    queryArgs,
    url: 'api/posts',
    headers,
  });
}
export function getPost(queryArgs,endpoint) {
  const headers = {
    'Content-type': 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNpcmRhdDE5OTNAZ21haWwuY29tIiwiaWF0IjoxNDg3NzY4MTE3fQ.Ds8JI_moMH9-UzuS38p1zGWirYNM89uadhV8RsShTjg',
  };
  return get({
    queryArgs,
    url: endpoint,
    headers,
  });
}

export function postPost(queryArgs) {
  const headers = {
    'Content-type': 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNpcmRhdDE5OTNAZ21haWwuY29tIiwiaWF0IjoxNDg3NzY4MTE3fQ.Ds8JI_moMH9-UzuS38p1zGWirYNM89uadhV8RsShTjg',
  };
  return post({
    queryArgs,
    url: 'api/posts',
    headers,
  });
}
