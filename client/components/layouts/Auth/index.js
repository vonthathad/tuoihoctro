import React, { Component, PropTypes } from 'react';

import { LoginWidget } from './LoginWidget';
import { RegisterWidget } from './RegisterWidget';
// Import Style
import styles from './LoginWidget/index.css';
export class Auth extends React.PureComponent {
  render() {
    const cls = `${styles.login} ${(this.props.showElement == 'login' || this.props.showElement == 'register' ? styles.appear : '')}`;
    return (
      <div className={cls}>
        {
          this.props.showElement == 'login'
            ? <LoginWidget closeElement={this.props.closeElement} loginUser={this.props.loginUser} />
            : <RegisterWidget closeElement={this.props.closeElement} registerUser={this.props.registerUser} />
        }
      </div>
    );
  }
}

Auth.propTypes = {
  closeElement: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  showElement: PropTypes.string,
};
export default Auth;
