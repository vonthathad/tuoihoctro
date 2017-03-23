import { connect } from 'react-redux';
import PostsList from '../layouts/PostsList/PostsList';

const mapStateToProps = (state) => {
  return {
    postsList: state.postsStore.postsList,
  };
};


export default connect(mapStateToProps)(PostsList);
