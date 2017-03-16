import React, { Component, PropTypes } from 'react';

// Import Plugin
import FacebookProvider, { Login } from 'react-facebook';

// Import Style
import styles from './LoginWidget.css';
import icons from '../../../../assets/css/icon.css';
export class LoginWidget extends Component {
  onFacebookResponse() {
  }
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
          <span onClick={this.props.toggleLogin}>x</span>
          <div className="col-md-12">
            Login via
            <div className={styles['social-buttons']}>
              <FacebookProvider appID="1559166841054175">
                <Login scope="email" onResponse={this.onFacebookResponse.bind(this)}>
                  <a href="#" className={`btn ${styles['btn-fb']}`}><i className={`${icons.fa} ${icons['fa-facebook']}`}></i> Facebook</a>
                </Login>
              </FacebookProvider>
              <a href="#" className={`btn ${styles['btn-tw']}`}><i className="fa fa-twitter"></i> Twitter</a>
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
        <div className={styles['login-background']} onClick={this.props.toggleLogin}>
        </div>
      </div>
    );
  }
}

LoginWidget.propTypes = {
  toggleLogin: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
};

export default LoginWidget;
