import request from '../../services/api.services';

// Export Constants
export const ADD_POST = 'ADD_POST';
export const ADD_POSTS = 'ADD_POSTS';
export const DELETE_POST = 'DELETE_POST';

// Export Actions
export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  };
}

export function addPostRequest(post) {
  const headers = {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRydW5naGlldXRrNDU5QGdtYWlsLmNvbSIsImlhdCI6MTQ4ODIwMzY1M30.GW5HawuuydIIQx77pp4tzpnYst1QnrbGZUyjf8uZl8I',
  };
  return (dispatch) => {
    return request('posts', headers, 'post', {
      post,
    }).then(res => {
      dispatch(addPost(res.post));
    });
  };
}

export function addPosts(posts) {
  return {
    type: ADD_POSTS,
    posts,
  };
}

export function fetchPosts() {
  const headers = {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRydW5naGlldXRrNDU5QGdtYWlsLmNvbSIsImlhdCI6MTQ4ODIwMzY1M30.GW5HawuuydIIQx77pp4tzpnYst1QnrbGZUyjf8uZl8I',
  };
  return (dispatch) => {
    return request('posts', headers).then(res => {
      dispatch(addPosts(res));
    });
  };
}

export function fetchPost(cuid) {
  const headers = {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRydW5naGlldXRrNDU5QGdtYWlsLmNvbSIsImlhdCI6MTQ4ODIwMzY1M30.GW5HawuuydIIQx77pp4tzpnYst1QnrbGZUyjf8uZl8I',
  };
  return (dispatch) => {
    return request(`posts/${cuid}`, headers).then(res => dispatch(addPost(res.post)));
  };
}

export function deletePost(cuid) {
  return {
    type: DELETE_POST,
    cuid,
  };
}

export function deletePostRequest(cuid) {
  const headers = {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRydW5naGlldXRrNDU5QGdtYWlsLmNvbSIsImlhdCI6MTQ4ODIwMzY1M30.GW5HawuuydIIQx77pp4tzpnYst1QnrbGZUyjf8uZl8I',
  };
  return (dispatch) => {
    return request(`posts/${cuid}`, headers, 'delete').then(() => dispatch(deletePost(cuid)));
  };
}
