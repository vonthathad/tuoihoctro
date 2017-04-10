import React, { Component, PropTypes } from 'react';
import styles from './index.css';
import { Link } from 'react-router';
import { _fetchPostClient } from '../../../_actions/PostsActions';
class Recommend extends Component {
  constructor(props) {
    super(props);
    this.handleGoDetailPost = this.handleGoDetailPost.bind(this);
  }
  handleGoDetailPost() {
    this.props.dispatch(_fetchPostClient(this.props.post));
  }
  render() {
    return (
      <Link to={`/posts/${this.props.post._id}`} onClick={this.handleGoDetailPost}>
        <div className={styles['featured-recommend']}>
          <div className={styles['featured-image']}>
            {this.props.children}
          </div>
          <div className={styles['featured-title']}>
            <h2>{this.props.post.title}</h2>
          </div>
        </div>
      </Link>
    );
  }
}

Recommend.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func,
};

export default Recommend;
