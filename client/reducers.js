/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
// import app from './components-page/content/_reducer';
import posts from './_reducers/PostsReducer';
import smallThumbs from './_reducers/SmallThumbsReducer';
import thumbs from './_reducers/ThumbsReducer';
import login from './_reducers/UsersReducer';
import app from './components/templates/Guest/reducer';
// Combine all reducers into one root reducer
export default combineReducers({
  app,
  posts,
  thumbs,
  smallThumbs,
  login,
});
