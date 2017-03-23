import React, { PropTypes } from 'react';
// import { connect } from 'react-redux';
// Import Components
import PostsListContainer from '../../containers/PostsListContainer';
import RecommendsListContainer from '../../containers/RecommendsListContainer';

// Import Actions
import { _fetchPostsChunk } from '../../../_actions/PostsActions';
import { _fetchRecommendsChunk } from '../../../_actions/RecommendsActions';

// Import Selectors
// import { getPosts } from '../../../_reducers/PostsReducer';
// import { getRecommends } from '../../../_reducers/RecommendsReducer';

import st from './index.css';

const Home = () => (
  <div className={`container ${st.wrapper}`}>
    <div className={'col-sm-8'}>
      <PostsListContainer />
    </div>
    <div className={' col-sm-4'}>
      <RecommendsListContainer />
    </div>
  </div>
);

// Actions required to provide data for this component to render in sever side.
Home.need = [
  () => { return _fetchPostsChunk('mediaContent'); },
  // () => { return _fetchRecommendsChunk('smallThumb'); },
];

Home.contextTypes = {
  router: PropTypes.object,
};
export default Home;
