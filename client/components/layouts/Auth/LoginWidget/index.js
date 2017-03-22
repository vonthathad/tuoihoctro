import React, { Component, PropTypes } from 'react';

// Import Style
import styles from './index.css';

export class LoginWidget extends Component {
  loginUser = () => {
    const emailRef = this.refs.email;
    const passwordRef = this.refs.password;
    if (emailRef.value && passwordRef.value) {
      this.props.loginUser(emailRef.value, passwordRef.value);
      emailRef.value = passwordRef.value = '';
    }
  };
  render() {
    return (
      <div>
        <div className={styles['login-content']}>
          <span onClick={this.props.closeElement}>x</span>
          <div className="col-md-12">
            Login via
            <div className={styles['social-buttons']}>
              <a href="#" className={`btn ${styles['btn-fb']}`}>Facebook</a>
            </div>
            or
            <form className="form" role="form" method="post" action="login">
              <div className={`form-group ${styles['form-group']}`}>
                <label className="sr-only" htmlFor="exampleInputEmail2">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail2" placeholder="Email address" required ref="email" />
              </div>
              <div className={`form-group ${styles['form-group']}`}>
                <label className="sr-only" htmlFor="exampleInputPassword2">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Password" required ref="password" />
                <div className="help-block text-right"><a href="">Forget the password ?</a></div>
              </div>
              <div className={`form-group ${styles['form-group']}`}>
                <button type="button" className="btn btn-primary btn-block" onClick={this.loginUser}>Sign in</button>
              </div>
              <div className="checkbox">
                <label>
                  <input type="checkbox" /> keep me logged-in
                </label>
              </div>
            </form>
          </div>
          <div className="bottom text-center">
            New here ? <a href="#" ><b>Join Us</b></a>
          </div>
        </div>
        <div className={styles['login-background']} onClick={this.props.closeElement}>
        </div>
      </div>
    );
  }
}

LoginWidget.propTypes = {
  closeElement: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
};

export default LoginWidget;
