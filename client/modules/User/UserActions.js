import callApiUser from '../../util/apiCallerUser';

// Export Constants
export const LOGIN_USER = 'LOGIN_USER';
export const REGISTER_USER = 'REGISTER_USER';

// Export Actions
export function loginUser(user) {
  return {
    type: LOGIN_USER,
    user,
  };
}
export function registerUser(user) {
  return {
    type: REGISTER_USER,
    user,
  };
}


export function loginRequest(data) {
  return (dispatch) => {
    return callApiUser('login', 'post', {
      user: {
        username: data.email,
        password: data.password,
      },
    }).then((res) => {
      dispatch(loginUser(res.data));
    });
  };
}


export function registerRequest(data) {
  return (dispatch) => {
    return callApiUser('register', 'post', {
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    }).then((res) => {
      dispatch(registerUser(res.data));
    });
  };
}
