import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Import Style
import styles from './App.css';

// Import Components
import Helmet from 'react-helmet';
import DevTools from './components/DevTools';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import User from '../User/components/user';
import PostCreateWidget from '../Post/components/Post/PostCreateWidget/PostCreateWidget';

// Import Actions
import { toggleAddPost, toggleLogin, toggleRegister } from './AppActions';
import { addPostRequest } from '../Post/PostActions';
import { loginRequest, registerRequest } from '../User/UserActions';

import { switchLanguage } from '../../modules/Intl/IntlActions';

// Import Reducer
import { getShowRegister, getShowLogin, getShowAddPost } from '../App/AppReducer';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }
  componentDidMount() {
    this.setState({ isMounted: true }); // eslint-disable-line
  }

  toggleAddPostSection = () => {
    this.props.dispatch(toggleAddPost());
  };

  toggleLoginSection = () => {
    this.props.dispatch(toggleLogin());
  };
  toggleRegisterSection = () => {
    this.props.dispatch(toggleRegister());
  };
  handleAddPost = (name, title, content) => {
    this.props.dispatch(toggleAddPost());
    this.props.dispatch(addPostRequest({ name, title, content }));
  };
  handleLogin = (email, password) => {
    this.props.dispatch(toggleLogin());
    this.props.dispatch(loginRequest({ email, password }));
  };
  handleRegister = (username, email, password) => {
    this.props.dispatch(toggleRegister());
    this.props.dispatch(registerRequest({ username, email, password }));
  };
  render() {
    return (
      <div>
        {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
        <div>
          <Helmet
            title="MERN Starter - Blog App"
            titleTemplate="%s - Blog App"
            meta={[
              { charset: 'utf-8' },
              {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge',
              },
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
              },
            ]}
          />
          <Header
            switchLanguage={lang => this.props.dispatch(switchLanguage(lang))}
            intl={this.props.intl}
            toggleAddPost={this.toggleAddPostSection}
            toggleLogin={this.toggleLoginSection}
            toggleRegister={this.toggleRegisterSection}
            curentUser={this.props.curentUser}
          />
          <PostCreateWidget addPost={this.handleAddPost} showAddPost={this.props.showAddPost} />
          <User
            toggleLogin={this.toggleLoginSection}
            toggleRegister={this.toggleRegisterSection}
            loginUser={this.handleLogin}
            registerUser={this.handleRegister}
            showLogin={this.props.showLogin}
            showRegister={this.props.showRegister}
          />
          <div className={styles.container}>
            {this.props.children}
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  curentUser: PropTypes.object.isRequired,
  showLogin: PropTypes.bool.isRequired,
  showRegister: PropTypes.bool.isRequired,
  showAddPost: PropTypes.bool.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    intl: store.intl,
    curentUser: store.loginUser,
    showLogin: getShowLogin(store),
    showRegister: getShowRegister(store),
    showAddPost: getShowAddPost(store),
  };
}

export default connect(mapStateToProps)(App);
