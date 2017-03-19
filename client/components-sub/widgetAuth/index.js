import React, { Component, PropTypes } from 'react';

import { LoginWidget } from '../widgetAuthLogin';
import { RegisterWidget } from '../widgetAuthRegister';
// Import Style
import styles from '../widgetAuthLogin/index.css';
export class User extends Component {
  onFacebookResponse() {
  }
  login = () => {
    const emailRef = this.refs.email;
    const passwordRef = this.refs.password;
    if (emailRef.value && passwordRef.value) {
      this.props.login(emailRef.value, passwordRef.value);
      emailRef.value = passwordRef.value = '';
    }
  };
  render() {
    const cls = `${styles.login} ${(this.props.showLogin || this.props.showRegister ? styles.appear : '')}`;
    return (
      <div className={cls}>
        {
          this.props.showRegister === false
            ? <LoginWidget toggleLogin={this.props.toggleLogin} login={this.props.login} />
            : <RegisterWidget toggleRegister={this.props.toggleRegister} register={this.props.register} />
        }
      </div>
    );
  }
}

User.propTypes = {
  toggleLogin: PropTypes.func.isRequired,
  toggleRegister: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  showLogin: PropTypes.bool.isRequired,
  showRegister: PropTypes.bool.isRequired,
};

export default User;
