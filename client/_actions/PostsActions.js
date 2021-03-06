// import request from '../../services/api.services';
// import { getPosts, addPost, getPost, deletePost, vote } from '../utils/PostsUtils';
import { toggleAlert } from './WidgetActions';

import { getPosts, addPost, getPost, deletePost, vote, view } from '../utils/PostsUtils';
import { checkLoginAction } from '../_actions/AuthActions';
// Post list
export const FETCH_POSTS_CHUNK = 'FETCH_POSTS_CHUNK';
export const FETCH_POSTS_CHUNK_SUCCESS = 'FETCH_POSTS_CHUNK_SUCCESS';
export const FETCH_POSTS_CHUNK_FAILURE = 'FETCH_POSTS_CHUNK_FAILURE';

export const REMOVE_ALL_POST = 'REMOVE_ALL_POST';

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
export const TEMP_VOTE_POST_SUCCESS = 'TEMP_VOTE_POST_SUCCESS';
export const TEMP_VOTE_POST_DETAIL_SUCCESS = 'TEMP_VOTE_POST_DETAIL_SUCCESS';

// function updateView(p)
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
function voteSuccess() {
  return {
    type: VOTE_POST_SUCCESS,
  };
}
function voteFailure(post) {
  return {
    type: VOTE_POST_FAILURE,
    payload: post,
  };
}
export function tempVoteSuccess(post) {
  return {
    type: TEMP_VOTE_POST_SUCCESS,
    payload: post,
  };
}
export function tempVoteDetailSuccess(post) {
  return {
    type: TEMP_VOTE_POST_DETAIL_SUCCESS,
    payload: post,
  };
}
function removeAllPosts() {
  return {
    type: REMOVE_ALL_POST,
  };
}
export function _removeAllPosts() {
  return (dispatch) => {
    dispatch(removeAllPosts());
  };
}

export function _fetchPostsChunk(page, order) {
  return (dispatch) => {
    dispatch(fetchPostsChunk());
    // let order = window.location.href.split('order/')[1];
    // if (order.indexOf('created') + order.indexOf('top') + order.indexOf('hot') > -2) order = '';
    // console.log(window.location.href.split('order/')[1]);
    // console.log(order);
    const queryArgs = { page, order };
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
export function _fetchPostClient(post) {
  return (dispatch) => {
    // console.log(post._id);
    // console.log(5421);
    view(post._id);
    dispatch(fetchPostSuccess(post));
  };
}
export function votePost(voteData) {
  return (dispatch) => {
    const checked = dispatch(checkLoginAction());
    return checked
      ? vote(voteData.postId)
        .then(res => {
          if (res.data) {
            // console.log(res.data.votes);
            dispatch(voteSuccess({
              ...voteData,
              postVotes: res.data.votes,
            }));
          }
        })
        .catch(error => {
          // console.log(error);
          dispatch(voteFailure(voteData));
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
      dispatch(toggleAlert('Đăng bài thành công'));
      setTimeout(function () { dispatch(toggleAlert('')); }, 3000);
    }).catch(error => {
      dispatch(toggleAlert('Đăng bài lỗi'));
      setTimeout(function () { dispatch(toggleAlert('')); }, 3000);
    });
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
