import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// Import Components
import PostsListContainer from '../../containers/PostsListContainer';
import RecommendsListContainer from '../../containers/RecommendsListContainer';

// Import Actions
import { _fetchPostsChunk } from '../../../_actions/PostsActions';
import { _fetchRecommendsChunk } from '../../../_actions/RecommendsActions';

// Import Selectors
// import { getPosts } from '../../../_reducers/PostsReducer';
// import { getRecommends } from '../../../_reducers/RecommendsReducer';
import Helmet from 'react-helmet';
import st from './index.css';
// @connect(
//   () => { },
//   { _fetchPostsChunk, _fetchRecommendsChunk }
// )
class Home extends Component {
  componentDidMount() {
    if (process.env.NODE_ENV === 'development') {
      this.props.fetchPostChunk();
      this.props.fetchRecommendsChunk();
    }
  }
  render() {
    return (
      <div className={`container ${st.wrapper}`}>
        <Helmet
          title="Tuổi học trò - tuoihoctro.com"
          titleTemplate="%s - tuoihoctro.co"
          meta={[
            { charset: 'utf-8' },
            {
              'http-equiv': 'X-UA-Compatible',
              content: 'IE=edge',
            },
            {
              name: 'viewport',
              content: 'width=device-width, initial-scale=1',
            },
          ]}
        />
        <div className={'col-sm-8'}>
          <PostsListContainer />
        </div>
        <div className={' col-sm-4'}>
          <RecommendsListContainer />
        </div>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
Home.need = [
  () => { return _fetchPostsChunk(1); },
  () => { return _fetchRecommendsChunk(200); },
];

Home.contextTypes = {
  router: PropTypes.object,
};
Home.propTypes = {
  fetchPostChunk: PropTypes.func,
  fetchRecommendsChunk: PropTypes.func,
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchPostChunk: () => dispatch(_fetchPostsChunk(1)),
    fetchRecommendsChunk: () => dispatch(_fetchRecommendsChunk(200)),
  };
};

export default connect(null, mapDispatchToProps)(Home);
