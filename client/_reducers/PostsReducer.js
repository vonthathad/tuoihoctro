import {
  FETCH_POSTS_CHUNK, FETCH_POSTS_CHUNK_FAILURE, FETCH_POSTS_CHUNK_SUCCESS,
} from '../_actions/PostsActions';
const INITIAL_STATE = {
  // postsLists: { postsChunks: [{ posts: [], error: null, loading: false }], page: 1, paging: 5 },
  postsLists: { postsChunks: [], page: 1, paging: 5, error: false },
  newPost: { post: null, error: null, loading: false },
  activePost: { post: null, error: null, loading: false },
  deletedPost: { post: null, error: null, loading: false },
};
// Initial State

const PostReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_POSTS_CHUNK:
      {
        // const postsChunks = state.postsLists.postsChunks.push(action.payload);
        // return { ...state, postsLists: { ...state.postsLists, postsChunks, error: null, loading: false, page: state.postsLists.page++ } };
        // const postsChunks = state.postsLists.postsChunks.slice();
        // const lastChunkIndex = postsChunks.length - 1;
        // postsChunks[lastChunkIndex] = {};
        // postsChunks[lastChunkIndex].error = null;
        // postsChunks[lastChunkIndex].loading = true;
        // postsChunks[lastChunkIndex].posts = [];
        // console.log(state.postsLists);
        return {
          ...state, postsLists:
          {
            ...state.postsLists,
            postsChunks: [
              ...state.postsLists.postsChunks,
              {
                loading: true,
                posts: [],
              },
            ],
          },
        };
      }
    case FETCH_POSTS_CHUNK_SUCCESS:
      {
        // console.log(state.postsLists);
        const postsChunks = state.postsLists.postsChunks;
        const lastChunkIndex = postsChunks.length - 1;
        postsChunks[lastChunkIndex].loading = false;
        postsChunks[lastChunkIndex].posts = action.payload;
        // console.log({ ...state, postsLists: { ...state.postsLists, postsChunks } });
        // console.log(state.postsLists);
        return {
          ...state,
          postsLists:
          {
            ...state.postsLists,
            postsChunks,
            page: state.postsLists.page + 1,
          },
        };
      }
    // return Object.assign(...state,
    //   {
    //     postsChunks: [...state.postsChunks, {
    //       isFetching: true,
    //       pageOrder: action.pageOrder,
    //       posts: []
    //     }]
    //   });
    case FETCH_POSTS_CHUNK_FAILURE:
    // {
    //   return { ...state, postsLists: { loading: false } };
    // }
      {
        const postsChunks = state.postsLists.postsChunks;
        const lastChunkIndex = postsChunks.length - 1;
        postsChunks[lastChunkIndex].loading = true;
        return {
          ...state,
          postsLists:
          {
            ...state.postsLists,
            postsChunks,
            error: true,
          },
        };
      }
    default:
      return state;
  }
};

/* Selectors */

// Get all posts
export const getPosts = state => state.posts.data;

// Get post by cuid
export const getPost = (state, cuid) => state.posts.data.filter(post => post._id === parseInt(cuid, 10))[0];

// Export Reducer
export default PostReducer;
