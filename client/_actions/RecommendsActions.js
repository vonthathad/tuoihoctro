// import request from '../../services/api.services';
import { getPostsRecommend } from '../utils/PostsUtils';
// Recommend list
export const FETCH_RECOMMEND_CHUNK = 'FETCH_RECOMMEND_CHUNK';
export const FETCH_RECOMMEND_CHUNK_SUCCESS = 'FETCH_RECOMMEND_CHUNK_SUCCESS';
export const FETCH_RECOMMEND_CHUNK_FAILURE = 'FETCH_RECOMMEND_CHUNK_FAILURE';

// export function createRecommend(smallThumb) {
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

function fetchRecommendsChunk() {
  return {
    type: FETCH_RECOMMEND_CHUNK,
  };
}

function fetchRecommendsChunkSuccess(recommends) {
  return {
    type: FETCH_RECOMMEND_CHUNK_SUCCESS,
    payload: recommends,
  };
}
function fetchRecommendsChunkFailure(error) {
  return {
    type: FETCH_RECOMMEND_CHUNK_FAILURE,
    payload: error,
  };
}

export function _fetchRecommendsChunk(page = 1) {
  return (dispatch) => {
    dispatch(fetchRecommendsChunk());
    // return request(`http://localhost:4000/api/smallThumbs?type=${type}&paging=${paging}&page=${page}`, {
    //   headers: {
    //     'Content-type': 'application/json',
    //     authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNpcmRhdDE5OTNAZ21haWwuY29tIiwiaWF0IjoxNDg3NzY4MTE3fQ.Ds8JI_moMH9-UzuS38p1zGWirYNM89uadhV8RsShTjg',
    //   },
    //   method: 'get',
    // })
    const queryArgs = { page };
    return getPostsRecommend(queryArgs)
      .then((recommends) => {
        return dispatch(fetchRecommendsChunkSuccess(recommends));
      }
      )
      .catch(error => {
        dispatch(fetchRecommendsChunkFailure(error));
      });
  };
}

