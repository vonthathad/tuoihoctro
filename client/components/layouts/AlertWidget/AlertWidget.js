import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
// Import Style
import styles from './index.css';

export class AlertWidget extends Component {
  constructor() {
    super();
  }

  render() {
    const showAlert = `${styles.snackbar} ${(this.props.showAlert ? styles.show : '')}`;
    return (
      <div className={showAlert}>
        {this.props.alertMessage}
      </div>
    );
  }
}

AlertWidget.propTypes = {
  showAlert: PropTypes.boolean,
  alertMessage: PropTypes.string
};

export default AlertWidget;
