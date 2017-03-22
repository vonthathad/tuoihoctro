import {
  FETCH_RECOMMEND_CHUNK, FETCH_RECOMMEND_CHUNK_FAILURE, FETCH_RECOMMEND_CHUNK_SUCCESS,
} from '../_actions/RecommendsActions';
const INITIAL_STATE = {
  recommendsList: { recommendsChunks: [], page: 1, paging: 5, error: false },
};
// Initial State

const RecommendsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_RECOMMEND_CHUNK:
      {
        return {
          ...state, recommendsList:
          {
            ...state.recommendsList,
            recommendsChunks: [
              ...state.recommendsList.recommendsChunks,
              {
                loading: true,
                recommends: [],
              },
            ],
          },
        };
      }
    case FETCH_RECOMMEND_CHUNK_SUCCESS:
      {
        const recommendsChunks = state.recommendsList.recommendsChunks;
        const lastChunkIndex = recommendsChunks.length - 1;
        recommendsChunks[lastChunkIndex].loading = false;
        recommendsChunks[lastChunkIndex].recommends = action.payload;
        return {
          ...state.recommendsList,
          recommendsChunks,
          page: state.recommendsList.page + 1,
        };
      }
    case FETCH_RECOMMEND_CHUNK_FAILURE:
      {
        const recommendsChunks = state.recommendsList.recommendsChunks;
        const lastChunkIndex = recommendsChunks.length - 1;
        recommendsChunks[lastChunkIndex].loading = true;
        return {
          ...state,
          recommendsList:
          {
            ...state.recommendsList,
            recommendsChunks,
            error: true,
          },
        };
      }
    default:
      return state;
  }
};

/* Selectors */

// Get all recommends
export const getRecommends = state => state.recommends.data;

// Get smallThumb by cuid
// export const getRecommend = (state, cuid) => state.recommends.data.filter(smallThumb => smallThumb._id === parseInt(cuid, 10))[0];

// Export Reducer
export default RecommendsReducer;
