/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import recommendsStore from './_reducers/RecommendsReducer';
import postsStore from './_reducers/PostsReducer';
import login from './_reducers/UsersReducer';
import app from './components/templates/Guest/reducer';
// Combine all reducers into one root reducer
export default combineReducers({
  app,
  postsStore,
  recommendsStore,
  login,
});
