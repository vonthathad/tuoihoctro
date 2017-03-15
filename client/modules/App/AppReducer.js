// Import Actions
import { TOGGLE_ADD_POST, TOGGLE_LOGIN, TOGGLE_REGISTER } from './AppActions';

// Initial State
const initialState = {
  showAddPost: false,
  showLogin: false,
  showRegister: false,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ADD_POST:
      return {
        showAddPost: !state.showAddPost,
        showRegister: false,
        showLogin: false,
      };
    case TOGGLE_LOGIN:
      return {
        showLogin: !state.showLogin,
        showRegister: false,
        showAddPost: false,
      };
    case TOGGLE_REGISTER:
      return {
        showRegister: !state.showRegister,
        showLogin: false,
        showAddPost: false,
      };
    default:
      return state;
  }
};

/* Selectors */

// Get showAddPost
export const getShowAddPost = state => state.app.showAddPost;

// Get showLogin
export const getShowLogin = state => state.app.showLogin;

// Get showRegister
export const getShowRegister = state => state.app.showRegister;

// Export Reducer
export default AppReducer;
