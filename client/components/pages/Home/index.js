import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Components
import ThumbsListsChunksContainer from '../../containers/ThumbsListsChunksContainer';
import SmallThumbsListsChunksContainer from '../../containers/SmallThumbsListsChunksContainer';
// import RecommendList from '../../layouts/RecommendList';

// Import Actions
// import { _fetchPostsChunk } from '../../../_actions/PostsActions';
import { _fetchThumbsChunk } from '../../../_actions/ThumbsActions';
import { _fetchSmallThumbsChunk } from '../../../_actions/SmallThumbsActions';

// Import Selectors
// import { getPosts } from '../../../reducers/PostsReducer';
import { getThumbs } from '../../../_reducers/ThumbsReducer';
import { getSmallThumbs } from '../../../_reducers/SmallThumbsReducer';

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
    const { dispatch } = this.props;
    return (
      <div className="container">
        <ThumbsListsChunksContainer />
        <SmallThumbsListsChunksContainer/>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
Home.need = [
  () => { return _fetchThumbsChunk('thumb'); },
  () => { return _fetchSmallThumbsChunk('smallThumb'); }
];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    smallThumbs: getSmallThumbs(state),
    thumbs: getThumbs(state),
  };
}
Home.propTypes = {
  smallThumbs: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  
    numComment: PropTypes.number.isRequired,
    point: PropTypes.number.isRequired,
    created: PropTypes.string.isRequired,
    view: PropTypes.number.isRequired,

    smallThumb: PropTypes.string.isRequired,
    smallThumbWidth: PropTypes.number.isRequired,
    smallThumbHeight: PropTypes.number.isRequired,
  })).isRequired,

  thumbs: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  
    numComment: PropTypes.number.isRequired,
    point: PropTypes.number.isRequired,
    created: PropTypes.string.isRequired,
    view: PropTypes.number.isRequired,

    thumb: PropTypes.string.isRequired,
    thumbWidth: PropTypes.number.isRequired,
    thumbHeight: PropTypes.number.isRequired,
  })).isRequired,

  dispatch: PropTypes.func.isRequired,
};

Home.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(
  mapStateToProps,
)(Home);
