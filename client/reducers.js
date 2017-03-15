/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import posts from './modules/Post/PostReducer';
import loginUser from './modules/User/UserReducer';
// Combine all reducers into one root reducer
export default combineReducers({
  app,
  posts,
  loginUser,
});
