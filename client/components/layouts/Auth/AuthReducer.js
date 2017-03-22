import { LOGIN_USER, REGISTER_USER } from './AuthActions';

// Initial State
const initialState = {};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER :
      return action.user;
    case REGISTER_USER :
      return action.user;
    default:
      return state;
  }
};

// Export Reducer
export default authReducer;
