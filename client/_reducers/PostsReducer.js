import {
  FETCH_POSTS_CHUNK, FETCH_POSTS_CHUNK_FAILURE, FETCH_POSTS_CHUNK_SUCCESS, CREATE_POST_SUCCESS
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

    case CREATE_POST_SUCCESS :
    {
      console.log(action);
      const temp = {postsList: {...state.postsList}};
      console.log(temp);
      temp.postsList.postsChunks[0].posts.unshift(action.post.data);

      return {
        ...state,
        ...temp
      };
    }

    case FETCH_POSTS_CHUNK:
    {
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
    case FETCH_POSTS_CHUNK_FAILURE:
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
export const getPost = (state, cuid) => state.postsStore.postsList.postsChunks[0].posts.filter(post => post._id == parseInt(cuid, 10))[0];
;

// Export Reducer
export default PostsReducer;
