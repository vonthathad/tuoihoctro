// Export Constants
export const TOGGLE_ADD_POST = 'TOGGLE_ADD_POST';

export const TOGGLE_LOGIN = 'TOGGLE_LOGIN';

export const TOGGLE_REGISTER = 'TOGGLE_REGISTER';

export const CLOSE_ELEMENT = 'CLOSE_ELEMENT';

export const TOGGLE_ALERT = 'TOGGLE_ALERT';
// Export Actions
export function toggleAddPost() {
  return {
    type: TOGGLE_ADD_POST,
  };
}

export function toggleLogin() {
  return {
    type: TOGGLE_LOGIN,
  };
}

export function toggleRegister() {
  return {
    type: TOGGLE_REGISTER,
  };
}

export function toggleAlert(msg) {
  return {
    type: TOGGLE_ALERT,
    alertMessage: msg
  };
}

export function closeElement() {
  return {
    type: CLOSE_ELEMENT,
  };
}

