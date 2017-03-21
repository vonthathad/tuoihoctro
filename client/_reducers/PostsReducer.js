import {
  FETCH_POSTS_CHUNK, FETCH_POSTS_CHUNK_FAILURE, FETCH_POSTS_CHUNK_SUCCESS,
} from '../_actions/PostsActions';
const INITIAL_STATE = {
  // postsList: { postsChunks: [{ posts: [], error: null, loading: false }], page: 1, paging: 5 },
  postsList: { postsChunks: [], page: 1, paging: 5, error: false },
  newPost: { post: null, error: null, loading: false },
  activePost: { post: null, error: null, loading: false },
  deletedPost: { post: null, error: null, loading: false },
};
// Initial State

const PostsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_POSTS_CHUNK:
      {
        // const postsChunks = state.postsList.postsChunks.push(action.payload);
        // return { ...state, postsList: { ...state.postsList, postsChunks, error: null, loading: false, page: state.postsList.page++ } };
        // const postsChunks = state.postsList.postsChunks.slice();
        // const lastChunkIndex = postsChunks.length - 1;
        // postsChunks[lastChunkIndex] = {};
        // postsChunks[lastChunkIndex].error = null;
        // postsChunks[lastChunkIndex].loading = true;
        // postsChunks[lastChunkIndex].posts = [];
        // console.log(state.postsList);
        return {
          ...state, postsList:
          {
            ...state.postsList,
            postsChunks: [
              ...state.postsList.postsChunks,
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
        // console.log(state.postsList);
        const postsChunks = state.postsList.postsChunks;
        const lastChunkIndex = postsChunks.length - 1;
        postsChunks[lastChunkIndex].loading = false;
        postsChunks[lastChunkIndex].posts = action.payload;
        // console.log(JSON.stringify({ ...state, postsList: { ...state.postsList, postsChunks } }));
        // console.log(JSON.stringify(state.postsList));
        // console.log('action.payload' + JSON.stringify(action.payload));
        return {
          ...state,
          postsList:
          {
            ...state.postsList,
            postsChunks,
            page: state.postsList.page + 1,
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
    //   return { ...state, postsList: { loading: false } };
    // }
      {
        const postsChunks = state.postsList.postsChunks;
        const lastChunkIndex = postsChunks.length - 1;
        postsChunks[lastChunkIndex].loading = true;
        return {
          ...state,
          postsList:
          {
            ...state.postsList,
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
export const getPosts = (state) => {
  // console.log(state);
  return state.posts;
};

// Get post by cuid
export const getPost = (state, cuid) => state.posts.data.filter(post => post._id === parseInt(cuid, 10))[0];

// Export Reducer
export default PostsReducer;
