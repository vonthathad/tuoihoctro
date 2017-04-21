/**
 * Root Component
 */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
// Import Routes
import routes from './routes';

import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';

// Base stylesheet
require('./main.css');

ReactGA.initialize('UA-51655784-10');

function logPageView() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}
export default class App extends Component {
  constructor(props) {
    super(props);
  }
  shoudComponentUpdate() {
    return false;
  }
  render() {
    return (
      <Provider store={this.props.store}>
        <Router history={browserHistory} routes={routes} onUpdate={logPageView}>
          {routes}
        </Router>
      </Provider>
    );
  }
}


App.propTypes = {
  store: React.PropTypes.object.isRequired,
};
