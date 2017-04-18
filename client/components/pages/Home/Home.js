import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// Import Components
import PostsListContainer from '../../containers/PostsListContainer';
import RecommendsList from '../../layouts/RecommendsList/RecommendsList';

// Import Actions
import { _fetchPostsChunk } from '../../../_actions/PostsActions';
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
  constructor(props) {
    super(props);
    this.state = {
      order: '',
    };
  }
  componentWillMount() {

  }

  componentDidMount() {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
    window.scrollTo(0, 0);
    console.log(this.props.params.order);
    // if (process.env.NODE_ENV === 'development') {
    //   this.props.fetchPostChunk();
    //   // this.props.fetchRecommendsChunk();
    // }
    // useScroll((prevRouterProps, { location }) => {
    //   console.log(prevRouterProps);
    //   return prevRouterProps && location.pathname !== prevRouterProps.location.pathname;
    // });
  }
  componentDidUpdate(prevProps) {
    console.log(prevProps.params);
    console.log(this.props.params);
    if (this.props.params) {
      const oldId = prevProps.params.order;
      const newId = this.props.params.order;
      if (newId !== oldId) {
        window.scrollTo(0, 0);
        this.setState({
          order: this.props.params.order ? this.props.params.order : '',
        });
        // const { dispatch, postsList, params } = this.props;
        // dispatch(_fetchPostsChunk(postsList.page, params ? params.order : ''));

        // this.props.dispatch(_fetchPost(this.props.params.postId));
        // this.fetchPost();
      }
    }
  }
  render() {
    return (
      <div className="container">
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
        <div className={`col-sm-8 ${st['col-sm-8']}`}>
          <PostsListContainer order={this.state.order} />
        </div>
        <div className={`col-sm-4 ${st['col-sm-4']}`}>
          <div className={st['ads-one']}>
            <a href="" target="blank">
              <img className="img-responsive"
                   src="http://bluehost-cdn.com/media/partner/images/maxlk/300x250/bh-300x250-01-dy.png"/>
            </a>
          </div>
          <RecommendsList numComments={30} type={'vertical'} />
        </div>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
Home.need = [
  params => {
    return _fetchPostsChunk(1, params.order ? params.order : '');
  },
  // () => { return _fetchRecommendsChunk(200); },
];

Home.contextTypes = {
  router: PropTypes.object,
};
Home.propTypes = {
  fetchPostChunk: PropTypes.func,
  fetchRecommendsChunk: PropTypes.func,
  params: PropTypes.object,
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchPostChunk: () => dispatch(_fetchPostsChunk(1)),
    // fetchRecommendsChunk: () => dispatch(_fetchRecommendsChunk(200)),
  };
};

export default connect(null, mapDispatchToProps)(Home);
