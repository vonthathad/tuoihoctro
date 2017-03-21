import { connect } from 'react-redux';
import PostsListsChunk from '../layouts/PostsListsChunks';

const mapStateToProps = (state) => {
  return {
    postsLists: state.posts.postsLists,
  };
};


export default connect(mapStateToProps)(PostsListsChunk);
