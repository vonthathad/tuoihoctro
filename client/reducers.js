/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
// import app from './components-page/content/_reducer';
import auth from './components/layouts/Auth/AuthReducer';
import recommendsStore from './_reducers/RecommendsReducer';
import postsStore from './_reducers/PostsReducer';
import app from './components/templates/Guest/reducer';
export default combineReducers({
  app,
  auth,
  postsStore,
  recommendsStore,
});
