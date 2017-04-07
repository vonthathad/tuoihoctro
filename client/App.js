/**
 * Root Component
 */
import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory, applyRouterMiddleware } from 'react-router';
import useScroll from 'react-router-scroll/lib/useScroll';
// Import Routes
import routes from './routes';

// Base stylesheet
require('./main.css');

export default function App(props) {
  return (
    <Provider store={props.store}>
      <Router history={browserHistory} render={applyRouterMiddleware(useScroll())}>
        {routes}
      </Router>
    </Provider>
  );
}

App.propTypes = {
  store: React.PropTypes.object.isRequired,
};
