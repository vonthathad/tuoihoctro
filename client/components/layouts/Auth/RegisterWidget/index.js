import React, { Component, PropTypes } from 'react';

// Import Plugin
// import FacebookProvider, { Login } from 'react-facebook';

// Import Style
import styles from './index.css';

export class RegisterWidget extends Component {

  onFacebookResponse() {
  }
  registerUser = () => {
    const emailRef = this.refs.email;
    const usernameRef = this.refs.username;
    const passwordRef = this.refs.password;
    if (emailRef.value && passwordRef.value && passwordRef.value) {
      this.props.registerUser(usernameRef.value, emailRef.value, passwordRef.value);
      emailRef.value = passwordRef.value = usernameRef.value = '';
    }
  };
  render() {
    return (
      <div>
        <div className={styles['login-content']}>
          <span onClick={this.props.closeElement}>x</span>
          <div className="col-md-12">
            Register via
            <div className={styles['social-buttons']}>
              {/*<FacebookProvider appID="1559166841054175">
                <Login scope="email" onResponse={this.onFacebookResponse.bind(this)}>
                  <a href="#" className={`btn ${styles['btn-fb']}`}>
                     Facebook</a>
                </Login>
              </FacebookProvider>*/}
              <a href="#" className={`btn ${styles['btn-tw']}`}><i className="fa fa-twitter"></i> Twitter</a>
            </div>
            or
            <form className="form" role="form" method="post" action="login">
              <div className={`form-group ${styles['form-group']}`}>
                <label className="sr-only" htmlFor="exampleInputName">User name</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputName"
                  placeholder="User name"
                  required
                  ref="username"
                />
              </div>
              <div className={`form-group ${styles['form-group']}`}>
                <label className="sr-only" htmlFor="exampleInputEmail2">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail2"
                  placeholder="Email address"
                  required
                  ref="email"
                />
              </div>
              <div className={`form-group ${styles['form-group']}`}>
                <label className="sr-only" htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  required
                  ref="password"
                />
              </div>
              <div className={`form-group ${styles['form-group']}`}>
                <label className="sr-only" htmlFor="exampleInputPassword2">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword2"
                  placeholder="Confirm Password" required
                />
              </div>
              <div className={`form-group ${styles['form-group']}`}>
                <button type="button" className="btn btn-primary btn-block" onClick={this.registerUser}>Sign up</button>
              </div>
              <div className="checkbox">
                <label>
                  <input type="checkbox" /> keep me logged-in
                </label>
              </div>
            </form>
          </div>
          <div className="bottom text-center">
            <a href="#"><b>Login</b></a>
          </div>
        </div>
        <div className={styles['login-background']} onClick={this.props.closeElement}>
        </div>
      </div>
    );
  }
}

RegisterWidget.propTypes = {
  closeElement: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
};

export default RegisterWidget;
