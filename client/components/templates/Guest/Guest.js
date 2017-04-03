import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// import SweetAlert from 'sweetalert-react';
// Import Style
import styles from './index.css';

// Import Components
import DevTools from '../../common/DevTools/DevTools';
import Header from '../../common/Header/Header';
import Footer from '../../common/Footer/Footer';
import Auth from '../../layouts/Auth';
import PostCreateWidget from '../../layouts/PostWidget/PostWidget';


// Import Actions
import { toggleAddPost, toggleLogin, toggleRegister, closeElement } from '../../../_actions/WidgetActions';
import { addPostRequest } from '../../../_actions/PostsActions';
import { loginRequest, registerRequest, checkLoginInit, logout } from '../../../_actions/AuthActions';

// Import Reducer
import { getShowElement } from '../../../_reducers/WidgetReducer';

export class Guest extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({isMounted: true}); // eslint-disable-line
    this.props.dispatch(checkLoginInit());
  }
  changeStyleModal() {
    // if (check === true) {
    //   document.body.style.overflow = 'hidden';
    // } else {
    //   document.body.style.overflow = 'inherit';
    // }
  }

  toggleAddPostSection = () => {
    this.changeStyleModal(true);
    this.props.dispatch(toggleAddPost());
  };

  toggleLoginSection = () => {
    this.changeStyleModal(true);
    this.props.dispatch(toggleLogin());
  };

  toggleRegisterSection = () => {
    this.changeStyleModal(true);
    this.props.dispatch(toggleRegister());
  };

  closeElementSection = () => {
    this.changeStyleModal(false);
    this.props.dispatch(closeElement());
  };

  handleAddPost = (title, category, file) => {
    // console.log(title, category, file);
    const data = new FormData();
    data.append('file', file);
    data.append('content', JSON.stringify({
      title, category,
    }));
    this.closeElementSection();
    this.props.dispatch(addPostRequest(data));
  };

  handleLogin = (email, password) => {
    this.closeElementSection();
    this.props.dispatch(loginRequest({ email, password }));
  };

  handleRegister = (username, email, password) => {
    this.closeElementSection();
    this.props.dispatch(registerRequest({ username, email, password }));
  };
  _confirm(content) {
    return confirm(content);
  }
  handleLogout = () => {
    const reply = this._confirm('Bạn muốn đăng xuất khỏi ứng dụng');
    if (reply === true) {
      this.props.dispatch(logout());
    }
  };


  render() {
    return (
      <div>
        {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
        <div>

          <div id={styles.wrap}>
            <Header
              toggleAddPost={this.toggleAddPostSection}
              toggleLogin={this.toggleLoginSection}
              toggleRegister={this.toggleRegisterSection}
              curentUser={this.props.curentUser}
              logout={this.handleLogout}
            />
            <PostCreateWidget
              addPost={this.handleAddPost}
              showElement={this.props.showElement}
              closeElement={this.closeElementSection}
            />
            <Auth
              closeElement={this.closeElementSection}
              toggleLogin={this.toggleLoginSection}
              toggleRegister={this.toggleRegisterSection}
              loginUser={this.handleLogin}
              registerUser={this.handleRegister}
              showElement={this.props.showElement}
            />
            {this.props.children}
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

Guest.propTypes = {
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
  curentUser: PropTypes.object.isRequired,
  showElement: PropTypes.string,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    curentUser: store.auth,
    showElement: getShowElement(store),
  };
}

export default connect(mapStateToProps)(Guest);
