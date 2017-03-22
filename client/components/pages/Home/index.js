import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Components
import PostsListContainer from '../../containers/PostsListContainer';
import RecommendsListContainer from '../../containers/RecommendsListContainer';

// Import Actions
import { _fetchPostsChunk } from '../../../_actions/PostsActions';
import { _fetchRecommendsChunk } from '../../../_actions/RecommendsActions';

// Import Selectors
import { getPosts } from '../../../_reducers/PostsReducer';
import { getRecommends } from '../../../_reducers/RecommendsReducer';

class Home extends Component {
  render() {
    return (
      <div className="container">
        <PostsListContainer />
        <RecommendsListContainer/>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
Home.need = [
  () => { return _fetchPostsChunk('thumb'); },
  () => { return _fetchRecommendsChunk('smallThumb'); }
];

Home.contextTypes = {
  router: React.PropTypes.object,
};
export default Home;
