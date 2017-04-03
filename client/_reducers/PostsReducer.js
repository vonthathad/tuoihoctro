import {
  FETCH_POSTS_CHUNK, FETCH_POSTS_CHUNK_FAILURE, FETCH_POSTS_CHUNK_SUCCESS, CREATE_POST_SUCCESS,
  FETCH_POST, FETCH_POST_FAILURE, FETCH_POST_SUCCESS, VOTE_UP_POST_SUCCESS, VOTE_DOWN_POST_SUCCESS,
} from '../_actions/PostsActions';
const INITIAL_STATE = {
  // postsList: { postsChunks: [{ posts: [], error: null, loading: false }], page: 1, paging: 5 },
  postsList: { postsChunks: [], page: 1, error: false, fetching: false, hasNext: true },
  newPost: { post: null, error: null, loading: false },
  activePost: { post: null, error: null, loading: false },
  deletedPost: { post: null, error: null, loading: false },
  postDetail: {},
};
// Initial State

const PostsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_POST_SUCCESS:
      {
        const temp = { postsList: { ...state.postsList } };
        temp.postsList.postsChunks[0].posts.unshift(action.post.data);
        return {
          ...state,
          ...temp,
        };
      }

    case FETCH_POST_SUCCESS:
      {
        const temp1 = { postDetail: { ...state.postDetail } };
        temp1.postDetail = action.postDetail.data;
        return {
          ...state,
          ...temp1,
        };
      }
    case FETCH_POSTS_CHUNK:
      {
        return {
          ...state,
          postsList:
          {
            ...state.postsList,
            fetching: true,
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
        const postsList = { ...state.postsList };
        const postsChunks = postsList.postsChunks;
        const lastChunkIndex = postsChunks.length - 1;
        postsChunks[lastChunkIndex].loading = false;
        postsChunks[lastChunkIndex].posts = action.payload.postsChunk;
        postsList.hasNext = action.payload.hasNext;
        postsList.fetching = false;
        postsList.page++;
        return {
          ...state,
          postsList,
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
            fetching: false,
            postsChunks,
            error: true,
          },
        };
      }
    case VOTE_UP_POST_SUCCESS:
      {
        const temp = { postDetail: { ...state.postDetail } };
        temp.postDetail.point += 1;
        return {
          ...state,
          ...temp,
        };
      }
    case VOTE_DOWN_POST_SUCCESS:
      {
        const temp4 = { postDetail: { ...state.postDetail } };
        temp4.postDetail.point -= 1;
        return {
          ...state,
          ...temp4,
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
export const getPost = (state, cuid) => state.postsStore.postsList.postsChunks[0].posts.filter(post => post._id === parseInt(cuid, 10))[0];

// Export Reducer
export default PostsReducer;
