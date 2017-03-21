// import callApiUser from '../../services/auth.services';

// // Export Constants
// export const LOGIN = 'LOGIN';
// export const REGISTER = 'REGISTER';

// // Export Actions
// export function login(user) {
//   return {
//     type: LOGIN,
//     user,
//   };
// }
// export function register(user) {
//   return {
//     type: REGISTER,
//     user,
//   };
// }


// export function loginRequest(data) {
//   return (dispatch) => {
//     return callApiUser('login', 'post', {
//       user: {
//         username: data.email,
//         password: data.password,
//       },
//     }).then((res) => {
//       dispatch(login(res.data));
//     });
//   };
// }


// export function registerRequest(data, cb) {
//   return (dispatch) => {
//     return callApiUser('register', 'post', {
//       user: {
//         username: data.username,
//         email: data.email,
//         password: data.password,
//       },
//     }).then((res) => {
//       cb(res);
//       dispatch(register(res.data));
//     });
//   };
// }
