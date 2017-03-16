import React, { Component, PropTypes } from 'react';

import { LoginWidget } from './LoginWidget/LoginWidget';
import { RegisterWidget } from './RegisterWidget/RegisterWidget';
// Import Style
import styles from './LoginWidget/LoginWidget.css';
export class User extends Component {
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
    const cls = `${styles.login} ${(this.props.showLogin || this.props.showRegister ? styles.appear : '')}`;
    return (
      <div className={cls}>
        {
          this.props.showRegister === false
            ? <LoginWidget toggleLogin={this.props.toggleLogin} loginUser={this.props.loginUser} />
            : <RegisterWidget toggleRegister={this.props.toggleRegister} registerUser={this.props.registerUser} />
        }
      </div>
    );
  }
}

User.propTypes = {
  toggleLogin: PropTypes.func.isRequired,
  toggleRegister: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  showLogin: PropTypes.bool.isRequired,
  showRegister: PropTypes.bool.isRequired,
};

export default User;
