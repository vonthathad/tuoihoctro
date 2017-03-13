import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Components
import PostList from '../../components/Post/PostList';
import RecommendList from '../../components/Recommend/RecommendList';

// Import Actions
import { fetchPosts, deletePostRequest } from '../../PostActions';

// Import Selectors
import { getPosts } from '../../PostReducer';

// Import Style
import styles from '../../components/Post/PostListItem/PostListItem.css';

class PostListPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  handleDeletePost = post => {
    if (confirm('Do you want to delete this post')) { // eslint-disable-line
      this.props.dispatch(deletePostRequest(post));
    }
  };

  render() {
    return (

      <div id={styles.wrap}>
        <div className="container">
          <PostList handleDeletePost={this.handleDeletePost} posts={this.props.posts} />
          <RecommendList handleDeletePost={this.handleDeletePost} posts={this.props.posts} />

        </div>
      </div>

    );
  }
}

// Actions required to provide data for this component to render in sever side.
PostListPage.need = [() => {
  return fetchPosts();
}];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    posts: getPosts(state),
  };
}

PostListPage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    mediaContent: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    thumb: PropTypes.string.isRequired,
    smallThumb: PropTypes.string.isRequired,
    numComment: PropTypes.number.isRequired,
    point: PropTypes.number.isRequired,
    created: PropTypes.string.isRequired,
    view: PropTypes.number.isRequired,
    smallThumbWidth: PropTypes.number.isRequired,
    smallThumbHeight: PropTypes.number.isRequired,
    thumbWidth: PropTypes.number.isRequired,
    thumbHeight: PropTypes.number.isRequired,
    mediaContentWidth: PropTypes.number.isRequired,
    mediaContentHeight: PropTypes.number.isRequired,
    creator: {
      avatar: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    },
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

PostListPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(PostListPage);
