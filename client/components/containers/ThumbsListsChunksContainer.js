import { connect } from 'react-redux';
import ThumbsListsChunk from '../layouts/ThumbsListsChunks';

const mapStateToProps = (state) => {
  return {
    thumbsLists: state.thumbs.thumbsLists,
  };
};


export default connect(mapStateToProps)(ThumbsListsChunk);
