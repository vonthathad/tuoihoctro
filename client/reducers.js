/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './components-page/content/reducer';
import posts from './actions-reducer-common/posts/reducer';
import login from './actions-reducer-common/users/reducer';
// Combine all reducers into one root reducer
export default combineReducers({
  app,
  posts,
  login,
});
