// import request from '../../services/api.services';
import { getPosts } from '../utils/PostsUtils';
// SmallThumb list
export const FETCH_SMALLTHUMBS_CHUNK = 'FETCH_SMALLTHUMBS_CHUNK';
export const FETCH_SMALLTHUMBS_CHUNK_SUCCESS = 'FETCH_SMALLTHUMBS_CHUNK_SUCCESS';
export const FETCH_SMALLTHUMBS_CHUNK_FAILURE = 'FETCH_SMALLTHUMBS_CHUNK_FAILURE';

// export function createSmallThumb(smallThumb) {
//   const headers = {
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRydW5naGlldXRrNDU5QGdtYWlsLmNvbSIsImlhdCI6MTQ4ODIwMzY1M30.GW5HawuuydIIQx77pp4tzpnYst1QnrbGZUyjf8uZl8I',
//     'content-type': 'application/json',
//   };
//   const request = callRequest('smallThumbs', headers, 'smallThumb', { smallThumb });
//   return {
//     type: CREATE_SMALLTHUMB,
//     payload: request,
//   };
// }

function fetchSmallThumbsChunk() {
  return {
    type: FETCH_SMALLTHUMBS_CHUNK,
  };
}

function fetchSmallThumbsChunkSuccess(smallThumbs) {
  return {
    type: FETCH_SMALLTHUMBS_CHUNK_SUCCESS,
    payload: smallThumbs,
  };
}
function fetchSmallThumbsChunkFailure(error) {
  return {
    type: FETCH_SMALLTHUMBS_CHUNK_FAILURE,
    payload: error,
  };
}

export function _fetchSmallThumbsChunk(type, paging = 5, page = 1) {
  return (dispatch) => {
    dispatch(fetchSmallThumbsChunk());
    // return request(`http://localhost:4000/api/smallThumbs?type=${type}&paging=${paging}&page=${page}`, {
    //   headers: {
    //     'Content-type': 'application/json',
    //     authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNpcmRhdDE5OTNAZ21haWwuY29tIiwiaWF0IjoxNDg3NzY4MTE3fQ.Ds8JI_moMH9-UzuS38p1zGWirYNM89uadhV8RsShTjg',
    //   },
    //   method: 'get',
    // })
    const queryArgs = { type, paging, page };
    return getPosts(queryArgs)
      .then(smallThumbs => dispatch(fetchSmallThumbsChunkSuccess(smallThumbs)))
      .catch(error => dispatch(fetchSmallThumbsChunkFailure(error)));
  };
}

