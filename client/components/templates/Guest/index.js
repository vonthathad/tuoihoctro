import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import SweetAlert from 'sweetalert-react';
// Import Style
import styles from './index.css';

// Import Components
import DevTools from '../../common/DevTools';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import User from '../../layouts/WidgetAuth';
import PostCreateWidget from '../../layouts/WidgetPostCreate';

// Import Actions
import { toggleAddPost, toggleLogin, toggleRegister } from './actions';
import { addPostRequest } from '../../../actions/PostsActions';
import { loginRequest, registerRequest } from '../../../actions/UsersActions';

// Import Reducer
import { getShowRegister, getShowLogin, getShowAddPost } from './reducer';

export class Guest extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false, show: false };
    this.showAlert = this.showAlert.bind(this);
  }
  componentDidMount() {
    this.setState({isMounted: true}); // eslint-disable-line
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
  handleAddPost = (title, category, file) => {
    const data = new FormData();
    data.append('file', file);
    data.append('content', JSON.stringify({
      title, category,
    }));
    this.props.dispatch(toggleAddPost());
    this.props.dispatch(addPostRequest(data));
  };
  handleLogin = (email, password) => {
    this.props.dispatch(toggleLogin());
    this.props.dispatch(loginRequest({ email, password }));
  };
  handleRegister = (username, email, password) => {
    this.props.dispatch(toggleRegister());
    this.props.dispatch(registerRequest({ username, email, password }, this.showAlert()));
  };
  showAlert() {
    this.setState({ show: true });
  }
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
            />
            <SweetAlert
              show={this.state.show}
              type="success"
              title="Đăng ký tài khoản thành công"
              text="Truy cập email để xác nhận đăng ký"
              onConfirm={() => this.setState({ show: false })}
            />
            <SweetAlert
              show={this.state.show}
              type="success"
              title="Đăng ký tài khoản thành công"
              text="Truy cập email để xác nhận đăng ký"
              onConfirm={() => this.setState({ show: false })}
            />
            <PostCreateWidget addPost={this.handleAddPost} showAddPost={this.props.showAddPost} />
            <User
              toggleLogin={this.toggleLoginSection}
              toggleRegister={this.toggleRegisterSection}
              login={this.handleLogin}
              register={this.handleRegister}
              showLogin={this.props.showLogin}
              showRegister={this.props.showRegister}
            />
            <div className={styles.container}>
              {this.props.children}
              <Footer />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Guest.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  curentUser: PropTypes.object.isRequired,
  showLogin: PropTypes.bool.isRequired,
  showRegister: PropTypes.bool.isRequired,
  showAddPost: PropTypes.bool.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    curentUser: store.login,
    showLogin: getShowLogin(store),
    showRegister: getShowRegister(store),
    showAddPost: getShowAddPost(store),
  };
}

export default connect(mapStateToProps)(Guest);
