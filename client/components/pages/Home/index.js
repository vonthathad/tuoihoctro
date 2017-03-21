import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Components
import PostsListsChunksContainer from '../../containers/PostsListsChunksContainer';
import RecommendList from '../../layouts/RecommendList';

// Import Actions
import { _fetchPostsChunk, deletePostRequest } from '../../../actions/PostsActions';

// Import Selectors
import { getPosts } from '../../../reducers/PostsReducer';

// Import Style
// import styles from '../../components/Post/PostListItem/PostListItem.css';

class Home extends Component {
  componentDidMount() {
    // this.props.dispatch(fetchPosts());
  }

  handleDeletePost = post => {
    if (confirm('Do you want to delete this post')) { // eslint-disable-line
      // this.props.dispatch(deletePostRequest(post));
    }
  };

  render() {
    const {dispatch} = this.props;
    return (
      <div className="container">
        <PostsListsChunksContainer/>
        <RecommendList handleDeletePost={this.handleDeletePost} posts={this.props.posts} />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
Home.need = [() => {
  return _fetchPostsChunk('mediaContent');
}];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    posts: getPosts(state),
  };
}
Home.propTypes = {
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
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

Home.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(
  mapStateToProps,
  )(Home);
