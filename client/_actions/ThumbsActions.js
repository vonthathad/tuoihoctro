// import request from '../../services/api.services';
import { getPosts } from '../utils/PostsUtils';
// Thumb list
export const FETCH_THUMBS_CHUNK = 'FETCH_THUMBS_CHUNK';
export const FETCH_THUMBS_CHUNK_SUCCESS = 'FETCH_THUMBS_CHUNK_SUCCESS';
export const FETCH_THUMBS_CHUNK_FAILURE = 'FETCH_THUMBS_CHUNK_FAILURE';


// export function createThumb(thumb) {
//   const headers = {
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRydW5naGlldXRrNDU5QGdtYWlsLmNvbSIsImlhdCI6MTQ4ODIwMzY1M30.GW5HawuuydIIQx77pp4tzpnYst1QnrbGZUyjf8uZl8I',
//     'content-type': 'application/json',
//   };
//   const request = callRequest('thumbs', headers, 'thumb', { thumb });
//   return {
//     type: CREATE_THUMB,
//     payload: request,
//   };
// }

function fetchThumbsChunk() {
  return {
    type: FETCH_THUMBS_CHUNK,
  };
}

function fetchThumbsChunkSuccess(thumbs) {
  return {
    type: FETCH_THUMBS_CHUNK_SUCCESS,
    payload: thumbs,
  };
}
function fetchThumbsChunkFailure(error) {
  return {
    type: FETCH_THUMBS_CHUNK_FAILURE,
    payload: error,
  };
}

export function _fetchThumbsChunk(type, paging = 5, page = 1) {
  return (dispatch) => {
    dispatch(fetchThumbsChunk());
    // return request(`http://localhost:4000/api/thumbs?type=${type}&paging=${paging}&page=${page}`, {
    //   headers: {
    //     'Content-type': 'application/json',
    //     authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNpcmRhdDE5OTNAZ21haWwuY29tIiwiaWF0IjoxNDg3NzY4MTE3fQ.Ds8JI_moMH9-UzuS38p1zGWirYNM89uadhV8RsShTjg',
    //   },
    //   method: 'get',
    // })
    const queryArgs = { type, paging, page };
    return getPosts(queryArgs)
      .then(thumbs => dispatch(fetchThumbsChunkSuccess(thumbs)))
      .catch(error => dispatch(fetchThumbsChunkFailure(error)));
  };
}
