// import request from '../../services/api.services';
import { getPosts, addPost, getPost, deletePost, vote } from '../utils/PostsUtils';

import { checkLoginAction } from '../_actions/AuthActions';
// Post list
export const FETCH_POSTS_CHUNK = 'FETCH_POSTS_CHUNK';
export const FETCH_POSTS_CHUNK_SUCCESS = 'FETCH_POSTS_CHUNK_SUCCESS';
export const FETCH_POSTS_CHUNK_FAILURE = 'FETCH_POSTS_CHUNK_FAILURE';

// Create new post
export const CREATE_POST = 'CREATE_POST';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE';

// Validate post fields like Title, Categries on the server
export const VALIDATE_POST_FIELDS = 'VALIDATE_POST_FIELDS';
export const VALIDATE_POST_FIELDS_SUCCESS = 'VALIDATE_POST_FIELDS_SUCCESS';
export const VALIDATE_POST_FIELDS_FAILURE = 'VALIDATE_POST_FIELDS_FAILURE';

// Fetch post
export const FETCH_POST = 'FETCH_POST';
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';
export const FETCH_POST_FAILURE = 'FETCH_POST_FAILURE';

// Delete post
export const DELETE_POST = 'DELETE_POST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';

export const VOTE_POST_SUCCESS = 'VOTE_POST_SUCCESS';
export const VOTE_POST_FAILURE = 'VOTE_POST_FAILURE';


function addPostSuccess(post) {
  return {
    type: CREATE_POST_SUCCESS,
    post,
  };
}
function fetchPostsChunk() {
  return {
    type: FETCH_POSTS_CHUNK,
  };
}
function fetchPostsChunkSuccess(postsData) {
  return {
    type: FETCH_POSTS_CHUNK_SUCCESS,
    payload: postsData,
  };
}
function fetchPostsChunkFailure(error) {
  return {
    type: FETCH_POSTS_CHUNK_FAILURE,
    payload: error,
  };
}

function fetchPostSuccess(postDetail) {
  return {
    type: FETCH_POST_SUCCESS,
    postDetail,
  };
}
export function voteSuccess(post) {
  return {
    type: VOTE_POST_SUCCESS,
    payload: post,
  };
}

export function _fetchPostsChunk(page) {
  return (dispatch) => {
    dispatch(fetchPostsChunk());
    const queryArgs = { page };
    return getPosts(queryArgs)
      .then(postsData => dispatch(fetchPostsChunkSuccess(postsData)))
      .catch(error => dispatch(fetchPostsChunkFailure(error)));
  };
}
export function _fetchPost(id) {
  return (dispatch) => {
    return getPost(id)
      .then(post => {
        dispatch(fetchPostSuccess(post));
      })
      .catch(error => console.log(error));
  };
}
export function votePost(postId) {
  return (dispatch) => {
    const checked = dispatch(checkLoginAction());
    return checked
      ? vote(postId)
        .then(res => {
          console.log(res);
          if (res.data) {
            dispatch(voteSuccess({
              id: postId,
              voted: res.data.voted,
            }));
          }
        })
      : null;
  };
}

export function addPostRequest(post) {
  return (dispatch) => {
    return addPost({
      post,
    }).then(res => {
      dispatch(addPostSuccess(res));
    }).catch(error => console.log(error));
  };
}

export function deletePostRequest(id) {
  return (dispatch) => {
    return deletePost(id)
      .then(res => {
        console.log(res);
      });
  };
}

export function updateViewPostRequest() {
  return (dispatch) => {
    return updateViewPost(id)
      .then(res => {

      });
  };
}

