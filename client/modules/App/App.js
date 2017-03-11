import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Import Style
import styles from './App.css';

// Import Components
import Helmet from 'react-helmet';
import DevTools from './components/DevTools';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LoginWidget from '../Login/components/LoginWidget/LoginWidget';
import PostCreateWidget from '../Post/components/Post/PostCreateWidget/PostCreateWidget';

// Import Actions
import { toggleAddPost, toggleLogin } from './AppActions';
import { addPostRequest } from '../Post/PostActions';

import { switchLanguage } from '../../modules/Intl/IntlActions';

// Import Reducer
import { getShowLogin, getShowAddPost } from '../App/AppReducer';

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
  handleAddPost = (name, title, content) => {
    this.props.dispatch(toggleAddPost());
    this.props.dispatch(addPostRequest({ name, title, content }));
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
          />
          <PostCreateWidget addPost={this.handleAddPost} showAddPost={this.props.showAddPost} />
          <LoginWidget toggleLogin={this.toggleLoginSection} showLogin={this.props.showLogin} />
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
  showLogin: PropTypes.bool.isRequired,
  showAddPost: PropTypes.bool.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    intl: store.intl,
    showLogin: getShowLogin(store),
    showAddPost: getShowAddPost(store),
  };
}

export default connect(mapStateToProps)(App);
