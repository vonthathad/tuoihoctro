import { connect } from 'react-redux';
import PostsList from '../layouts/PostsList/PostsList';

const mapStateToProps = (state) => {
  return {
    postsList: state.postsStore.postsList,
    auth: state.auth,
  };
};


export default connect(mapStateToProps)(PostsList);
