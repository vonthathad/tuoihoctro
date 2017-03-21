import {
  FETCH_SMALLTHUMBS_CHUNK, FETCH_SMALLTHUMBS_CHUNK_FAILURE, FETCH_SMALLTHUMBS_CHUNK_SUCCESS,
} from '../_actions/SmallThumbsActions';
const INITIAL_STATE = {
  smallThumbsLists: { smallThumbsChunks: [], page: 1, paging: 5, error: false },
  newSmallThumb: { smallThumb: null, error: null, loading: false },
  activeSmallThumb: { smallThumb: null, error: null, loading: false },
  deletedSmallThumb: { smallThumb: null, error: null, loading: false },
};
// Initial State

const SmallThumbsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_SMALLTHUMBS_CHUNK:
      {
        return {
          ...state, smallThumbsLists:
          {
            ...state.smallThumbsLists,
            smallThumbsChunks: [
              ...state.smallThumbsLists.smallThumbsChunks,
              {
                loading: true,
                smallThumbs: [],
              },
            ],
          },
        };
      }
    case FETCH_SMALLTHUMBS_CHUNK_SUCCESS:
      {
        // console.log(state.smallThumbsLists);
        const smallThumbsChunks = state.smallThumbsLists.smallThumbsChunks;
        const lastChunkIndex = smallThumbsChunks.length - 1;
        smallThumbsChunks[lastChunkIndex].loading = false;
        smallThumbsChunks[lastChunkIndex].smallThumbs = action.payload;
        return {
          ...state,
          smallThumbsLists:
          {
            ...state.smallThumbsLists,
            smallThumbsChunks,
            page: state.smallThumbsLists.page + 1,
          },
        };
      }
    case FETCH_SMALLTHUMBS_CHUNK_FAILURE:
      {
        const smallThumbsChunks = state.smallThumbsLists.smallThumbsChunks;
        const lastChunkIndex = smallThumbsChunks.length - 1;
        smallThumbsChunks[lastChunkIndex].loading = true;
        return {
          ...state,
          smallThumbsLists:
          {
            ...state.smallThumbsLists,
            smallThumbsChunks,
            error: true,
          },
        };
      }
    default:
      return state;
  }
};

/* Selectors */

// Get all smallThumbs
export const getSmallThumbs = state => state.smallThumbs.data;

// Get smallThumb by cuid
export const getSmallThumb = (state, cuid) => state.smallThumbs.data.filter(smallThumb => smallThumb._id === parseInt(cuid, 10))[0];

// Export Reducer
export default SmallThumbsReducer;
