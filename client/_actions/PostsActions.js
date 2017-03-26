// import request from '../../services/api.services';
import { getPosts, addPost, getPost,voteUp, voteDown } from '../utils/PostsUtils';
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

export const VOTE_UP_POST_SUCCESS = 'VOTE_UP_POST_SUCCESS';
export const VOTE_DOWN_POST_SUCCESS = 'VOTE_DOWN_POST_SUCCESS';
// export function createPost(post) {
//   const headers = {
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRydW5naGlldXRrNDU5QGdtYWlsLmNvbSIsImlhdCI6MTQ4ODIwMzY1M30.GW5HawuuydIIQx77pp4tzpnYst1QnrbGZUyjf8uZl8I',
//     'content-type': 'application/json',
//   };
//   const request = callRequest('posts', headers, 'post', { post });
//   return {
//     type: CREATE_POST,
//     payload: request,
//   };
// }

function voteUpSeccess() {
  return {
    type: VOTE_UP_POST_SUCCESS
  };
}

function voteDownSeccess() {
  return {
    type: VOTE_DOWN_POST_SUCCESS
  };
}

function addPostSuccess(post) {
  return {
    type: CREATE_POST_SUCCESS,
    post,
  };
}

function fetchPostSuccess(post) {
  return {
    type: FETCH_POST_SUCCESS,
    post,
  };
}

function fetchPostsChunk() {
  return {
    type: FETCH_POSTS_CHUNK,
  };
}
function fetchPostsChunkSuccess(posts) {
  return {
    type: FETCH_POSTS_CHUNK_SUCCESS,
    payload: posts,
  };
}
function fetchPostsChunkFailure(error) {
  return {
    type: FETCH_POSTS_CHUNK_FAILURE,
    payload: error,
  };
}

function fetchPost() {
  return {
    type: FETCH_POST,
  };
}
function fetchPostSuccess(postDetail) {
  return {
    type: FETCH_POST_SUCCESS,
    postDetail: postDetail,
  };
}
function fetchPostFailure(error) {
  return {
    type: FETCH_POST_FAILURE
  };
}

export function _fetchPostsChunk(page) {
  return (dispatch) => {
    dispatch(fetchPostsChunk());
    const queryArgs = { page };
    return getPosts(queryArgs)
      .then(posts => dispatch(fetchPostsChunkSuccess(posts)))
      .catch(error => dispatch(fetchPostsChunkFailure(error)));
  };
}
export function _fetchPost(id) {
  return (dispatch) => {
    return getPost(id)
      .then(post => {
        dispatch(fetchPostSuccess(post))
      })
      .catch(error => console.log(error));
  };
}

export function addPostRequest(post) {
  // console.log(post);
  return (dispatch) => {
    return addPost({
      post,
    }).then(res => {
      // console.log(res);
      dispatch(addPostSuccess(res));
    }).catch(error => console.log(error));;
  };
}

export function voteUpPost(id){
  return (dispatch) => {
    return voteUp(id)
      .then(res=>{
        console.log(res.data);

        if(res.data.voteUp){
          console.log(1);

          dispatch(voteUpSeccess())
        }
      })
  }
}
export function voteDownPost(id){
  return (dispatch) => {
    return voteDown(id)
      .then(res=>{
        console.log(res.data);

        if(res.data.voteDown){
          console.log(2);
          dispatch(voteDownSeccess())
        }
      })
  }
}
export function deletePost(cuid) {
  return {
    type: DELETE_POST,
    cuid,
  };
}

