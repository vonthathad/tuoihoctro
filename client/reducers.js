/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
// import app from './components-page/content/_reducer';
import posts from './_reducers/PostsReducer';
import smallThumbs from './_reducers/SmallThumbsReducer';
import thumbs from './_reducers/ThumbsReducer';
import auth from './components/layouts/Auth/AuthReducer';
import app from './components/templates/Guest/reducer';
// Combine all reducers into one root reducer
export default combineReducers({
  app,
  posts,
  thumbs,
  smallThumbs,
  auth,
});
