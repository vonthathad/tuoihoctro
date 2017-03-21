import {
  FETCH_THUMBS_CHUNK, FETCH_THUMBS_CHUNK_FAILURE, FETCH_THUMBS_CHUNK_SUCCESS,
} from '../_actions/ThumbsActions';
const INITIAL_STATE = {
  // thumbsLists: { thumbsChunks: [{ thumbs: [], error: null, loading: false }], page: 1, paging: 5 },
  thumbsLists: { thumbsChunks: [], page: 1, paging: 5, error: false },
  newThumb: { thumb: null, error: null, loading: false },
  activeThumb: { thumb: null, error: null, loading: false },
  deletedThumb: { thumb: null, error: null, loading: false },
};
// Initial State

const ThumbsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_THUMBS_CHUNK:
      {
        return {
          ...state, thumbsLists:
          {
            ...state.thumbsLists,
            thumbsChunks: [
              ...state.thumbsLists.thumbsChunks,
              {
                loading: true,
                thumbs: [],
              },
            ],
          },
        };
      }
    case FETCH_THUMBS_CHUNK_SUCCESS:
      {
        // console.log(state.thumbsLists);
        const thumbsChunks = state.thumbsLists.thumbsChunks;
        const lastChunkIndex = thumbsChunks.length - 1;
        thumbsChunks[lastChunkIndex].loading = false;
        thumbsChunks[lastChunkIndex].thumbs = action.payload;
        return {
          ...state,
          thumbsLists:
          {
            ...state.thumbsLists,
            thumbsChunks,
            page: state.thumbsLists.page + 1,
          },
        };
      }
    case FETCH_THUMBS_CHUNK_FAILURE:
      {
        const thumbsChunks = state.thumbsLists.thumbsChunks;
        const lastChunkIndex = thumbsChunks.length - 1;
        thumbsChunks[lastChunkIndex].loading = true;
        return {
          ...state,
          thumbsLists:
          {
            ...state.thumbsLists,
            thumbsChunks,
            error: true,
          },
        };
      }
    default:
      return state;
  }
};

/* Selectors */

// Get all thumbs
export const getThumbs = state => state.thumbs.data;

// Get thumb by cuid
export const getThumb = (state, cuid) => state.thumbs.data.filter(thumb => thumb._id === parseInt(cuid, 10))[0];

// Export Reducer
export default ThumbsReducer;
