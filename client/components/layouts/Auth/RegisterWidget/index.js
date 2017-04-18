import React, {Component, PropTypes} from 'react';

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
            <form className="form" role="form" method="post" action="login">
              <div className={`form-group ${styles['form-group']}`}>
                <label className="sr-only" htmlFor="exampleInputName">Tên đăng nhập</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputName"
                  placeholder="Nhập tên đăng nhập"
                  required
                  ref="username"
                />
              </div>
              <div className={`form-group ${styles['form-group']}`}>
                <label className="sr-only" htmlFor="exampleInputEmail2">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail2"
                  placeholder="Email"
                  required
                  ref="email"
                />
              </div>
              <div className={`form-group ${styles['form-group']}`}>
                <label className="sr-only" htmlFor="exampleInputPassword1">Mật khẩu</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Nhập mật khẩu"
                  required
                  ref="password"
                />
              </div>
              <div className={`form-group ${styles['form-group']}`}>
                <label className="sr-only" htmlFor="exampleInputPassword2">Xác định mật khẩu</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword2"
                  placeholder="Nhập lại mật khẩu" required
                />
              </div>
              <div className={`form-group ${styles['form-group']}`}>
                <button type="button" className="btn btn-primary btn-block" onClick={this.registerUser}>Đăng ký</button>
              </div>
            </form>
          </div>
          <div className="bottom text-center">
            <a onClick={this.props.toggleLogin}><b>Login</b></a>
          </div>
        </div>
        <div className={styles['login-background']} onClick={this.props.closeElement}>
        </div>
      </div>
    );
  }
}

RegisterWidget.propTypes = {
  toggleLogin: PropTypes.func.isRequired,
  closeElement: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
};

export default RegisterWidget;
