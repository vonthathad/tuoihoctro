import { connect } from 'react-redux';
import SmallThumbsListsChunk from '../layouts/SmallThumbsListsChunks';

const mapStateToProps = (state) => {
  return {
    smallThumbsLists: state.smallThumbs.smallThumbsLists,
  };
};


export default connect(mapStateToProps)(SmallThumbsListsChunk);
