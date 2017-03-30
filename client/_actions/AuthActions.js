import { login } from '../utils/UsersUtils';
import callApiUser from '../utils/_requestCaller';
// Export Constants
export const LOGIN_USER = 'LOGIN_USER';
export const REGISTER_USER = 'REGISTER_USER';

import {toggleLogin} from './WidgetActions'

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
  console.log(data);
  return (dispatch) => {
    return login({
      user: {
        username: data.email,
        password: data.password,
      },
    }).then((res) => {
      console.log(res);
      if (res.message) {
        alert(res.message);
      } else if (res.data) {
        localStorage.setItem('id', res.data._id);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', res.data.username);

        dispatch(loginUser(res.data));
      }
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
      if (res.token) {
        alert('Đăng ký thành công');
      } else {
        alert('Đăng ký lỗi');
      }
      dispatch(registerUser(res.data));
    });
  };
}

export function checkLoginInit() {
  return (dispatch) => {
    const data = {};
    data._id = localStorage.getItem('id');
    data.token = localStorage.getItem('token');
    data.username = localStorage.getItem('username');
    if (data._id && data._id !== null) {
      dispatch(loginUser(data));
    }
  };
}
export function checkLoginAction() {
  return (dispatch) => {
    if (!localStorage.getItem('id')) {
      dispatch(toggleLogin());
      return false
    } else return true
  };
}
export function logout() {
  return (dispatch) => {
    console.log(1);
    const data = {};
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    dispatch(loginUser(data));
  };
}

