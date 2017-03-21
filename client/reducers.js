/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
// import app from './components-page/content/reducer';
import posts from './reducers/PostsReducer';
import login from './reducers/UsersReducer';
import app from './components/templates/Guest/reducer';
// Combine all reducers into one root reducer
export default combineReducers({
  app,
  posts,
  login,
});
