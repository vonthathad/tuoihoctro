// Import Actions
import { TOGGLE_ADD_POST, TOGGLE_LOGIN, TOGGLE_REGISTER, CLOSE_ELEMENT, TOGGLE_ALERT } from '../_actions/WidgetActions';

// Initial State
const initialState = {
  showElement: '',
  showAlert: false,
  alertMessage: ''
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ADD_POST:
      return {
        showElement: 'post',
      };
    case TOGGLE_LOGIN:
      return {
        showElement: 'login',
      };
    case TOGGLE_REGISTER:
      return {
        showElement: 'register',
      };
    case TOGGLE_ALERT:
      return {
        ...state,
        showAlert: !state.showAlert,
        alertMessage: action.alertMessage

      };
    case CLOSE_ELEMENT:
      return {
        showElement: '',
      };
    default:
      return state;
  }
};

/* Selectors */

// Get showAddPost
export const getShowElement = state => state.app.showElement;

export const getShowAlert = state => state.app.showAlert;
// Export Reducer
export default AppReducer;
