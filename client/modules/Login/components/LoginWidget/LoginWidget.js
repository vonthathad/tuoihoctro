import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape } from 'react-intl';

// Import Plugin
import FacebookProvider, { Login } from 'react-facebook';

// Import Style
import styles from './LoginWidget.css';
import icons from '../../../../assets/css/icon.css';
export class LoginWidget extends Component {
  constructor() {
    super();
    this.state = {
      LoginOrRegister: true,
    };
    this.changeWidget = this.changeWidget.bind(this);
  }
  onFacebookResponse() {
  }
  changeWidget() {
    this.setState({ LoginOrRegister: !this.state.LoginOrRegister });
  }
  render() {
    const cls = `${styles.login} ${(this.props.showLogin ? styles.appear : '')}`;
    return (
      <div className={cls}>
        {
          this.state.LoginOrRegister === true ? <div className={styles['login-content']}>
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
                  <input type="email" className="form-control" id="exampleInputEmail2" placeholder="Email address" required />
                </div>
                <div className={`form-group ${styles['form-group']}`}>
                  <label className="sr-only" htmlFor="exampleInputPassword2">Password</label>
                  <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Password" required />
                  <div className="help-block text-right"><a href="">Forget the password ?</a></div>
                </div>
                <div className={`form-group ${styles['form-group']}`}>
                  <button type="submit" className="btn btn-primary btn-block">Sign in</button>
                </div>
                <div className="checkbox">
                  <label>
                    <input type="checkbox" /> keep me logged-in
                  </label>
                </div>
              </form>
            </div>
            <div className="bottom text-center">
              New here ? <a href="#" onClick={this.changeWidget}><b>Join Us</b></a>
            </div>
          </div> : <div className={styles['login-content']}>
            <span onClick={this.props.toggleLogin}>x</span>
            <div className="col-md-12">
              Register via
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
                  <input type="email" className="form-control" id="exampleInputEmail2" placeholder="Email address" required />
                </div>
                <div className={`form-group ${styles['form-group']}`}>
                  <label className="sr-only" htmlFor="exampleInputPassword1">Password</label>
                  <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" required />
                </div>
                <div className={`form-group ${styles['form-group']}`}>
                  <label className="sr-only" htmlFor="exampleInputPassword2">Confirm Password</label>
                  <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Confirm Password" required />
                </div>
                <div className={`form-group ${styles['form-group']}`}>
                  <button type="submit" className="btn btn-primary btn-block">Sign up</button>
                </div>
                <div className="checkbox">
                  <label>
                    <input type="checkbox" /> keep me logged-in
                  </label>
                </div>
              </form>
            </div>
            <div className="bottom text-center">
              <a href="#" onClick={this.changeWidget}><b>Login</b></a>
            </div>
          </div>
        }
        <div className={styles['login-background']} onClick={this.props.toggleLogin}>

        </div>
      </div>
    );
  }
}

LoginWidget.propTypes = {
  toggleLogin: PropTypes.func.isRequired,
  showLogin: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(LoginWidget);
