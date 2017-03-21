import { LOGIN, REGISTER } from '../_actions/UsersActions';

// Initial State
const initialState = {};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN :
      return action.user;
    case REGISTER :
      return action.user;
    default:
      return state;
  }
};

// Export Reducer
export default loginReducer;
