import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
// Import Components
// import RecommendList from '../../layouts/RecommendsListContainer/RecommendsListContainer';

import RecommendsListContainer from '../../containers/RecommendsListContainer';
import ImagePrettyLoad from '../../layouts/ImagePrettyLoad/ImagePrettyLoad';
import VideoAutoPlay from '../../layouts/VideoAutoPlay/VideoAutoPlay';

import Helmet from 'react-helmet';

// Import Style
import st from './PostDetail.css';

// Import Actions
import { _fetchPost, votePost, deletePostRequest } from '../../../_actions/PostsActions';

// import { getPost, getPosts } from '../../../_reducers/PostsReducer';

import FacebookProvider, { Comments, Share } from 'react-facebook';

export class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.handleVoteClick = this.handleVoteClick.bind(this);
    this.state = {};
  }
  componentDidMount() {
    this.props.dispatch(_fetchPost(this.props.params.postId));
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps);
    console.log(this.props);
    const oldId = prevProps.params.postId;
    const newId = this.props.params.postId;
    newId !== oldId && this.props.dispatch(_fetchPost(this.props.params.postId));
    // if (!this.props.post) {
    //   this.props.dispatch(_fetchPost(this.props.params.postId));
    // } else {
    //   if (this.props.params.postId !== this.props.post._id) {
    //     this.props.dispatch(_fetchPost(this.props.params.postId));
    //   }
    // }
  }
  deletePostByOwner(id) {
    this.props.dispatch(deletePostRequest(id));
  }
  vote(id) {
    this.props.dispatch(votePost(id));
  }
  handleVoteClick() {
    // console.log(this.props.auth._id);
    this.props.dispatch(tempVoteSuccess({
      userId: this.props.auth._id,
      postId: this.props.post._id,
      postVotes: this.props.post.votes,
    }));
    this.props.dispatch(votePost({
      userId: this.props.auth._id,
      postId: this.props.post._id,
      postVotes: this.props.post.votes,
    }));
  }
  readBack(id) {
    this.props.dispatch(_fetchPost(id - 1));
  }
  readNext(id) {
    console.log(id);
    browserHistory.go(`/posts/${id + 1}`);
  }
  render() {
    // console.log(this.props.post);
    const post = this.props.post;
    return (
      <div id={st.wrap}>
        <Helmet
          title={post.title}
          meta={[
            {
              name: 'viewport',
              content: 'width=device-width, initial-scale=1',
            },
            {
              name: 'keywords',
              content: 'tuoihoctro, tuổi học trò, gif, image, vui',
            },
            {
              name: 'title',
              content: `${post.title}`,
            },
            {
              name: 'description',
              content: `${post.title}`,
            },
            {
              name: 'og:description',
              content: `${post.title}`,
            },
            {
              name: 'og:image',
              content: `${post.mediaContent}`,
            },
            {
              name: 'og:url',
              content: `http://tuoihoctro.co/posts/${post._id}`,
            },
          ]}
        />
        <div className={`container ${st['style-container']}`}>
          <div className={`col-sm-8 ${st['style-col-detail']}`} id={st.left}>
            {
              (post && post.title)
                ? <div className={st['post-content-box']}>
                  <header className={st['post-header']}>
                    <div className={st['post-title']}><h1>{post.title}</h1></div>
                  </header>
                  <p className={st.smallText}>
                    {post.point} điểm . {post.view} bình luận
                  </p>
                  <div className={st['post-action']}>
                    <div className={st['social-box-top']}>
                      <div className={st.unvotedButton} onClick={this.vote.bind(this, post._id)} >
                        <span>Thích</span>
                      </div>
                      <div className={st.shareButton} >
                        <FacebookProvider appID="1559166841054175">
                          <Share>
                            <span className={st['remove-mobile']}>Chia sẻ</span>
                          </Share>
                        </FacebookProvider>
                      </div>
                      <div className={st.nextButton} onClick={this.readNext.bind(this, post._id)}>
                        <span className={st.text}>Xem tiếp</span>
                        <span className={st.arrow}></span>
                      </div>
                    </div>
                  </div>
                  <div className={st['post-page-left']}>
                    <div
                      id={st['page-post']}
                      className={st['post-content']}
                    >
                      {post.type.indexOf('gif') === -1 ?
                        <ImagePrettyLoad
                          key={post._id}
                          image={post.mediaContent}
                          imageLQ={post.mediaContentLQ}
                          imageHeight={post.mediaContentHeight}
                          imageWidth={post.mediaContentWidth}
                          containerWidth={this.containerWidth}
                        />
                        :
                        <VideoAutoPlay
                          key={post._id}
                          videoSrc={post.mediaContent}
                          videoHeight={post.mediaContentHeight}
                          videoWidth={post.mediaContentWidth}
                          containerWidth={this.containerWidth}
                        />
                      }
                      {/* <img alt="" src={post.mediaContent} className={st['img-responsive']} />*/}
                    </div>
                    {
                      (this.props.auth && post.creator && this.props.auth._id === post.creator._id)
                        ? <div className={st['bottom-share']} >
                          <a href="" onClick={this.deletePostByOwner.bind(this, post._id)}>
                            Delete this post
                          </a>
                        </div>
                        : null
                    }
                    {/* <div className={st.timeago}>
                      BY
                       {
                        (post.creator)
                          ? <a className={st['user-link']}> {post.creator.username}</a>
                          : null
                      }

                    </div>*/}
                  </div>
                  <div className={st['clear-fix']}></div>
                  <FacebookProvider appID="1559166841054175">
                    <Share>
                      <div className={st.shareButtonLarge}> Share on Facebook</div>
                    </Share>
                  </FacebookProvider>
                  <RecommendsListContainer />
                </div>
                : <div className={st.loading}>Loading&#8230;</div>
            }
          </div>
          <div className={`col-sm-4 ${st['style-col-detail']}`}>
            <div className={st['facebook-comments']}>
              <FacebookProvider appID="1559166841054175" >
                <Comments width="350px"/>
              </FacebookProvider>
            </div>
          </div>
        </div>
      </div >
    );
  }

}

// Actions required to provide data for this component to render in sever side.
PostDetail.need = [params => {
  return _fetchPost(params.postId);
}];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    post: state.postsStore.postDetail,
    auth: state.auth,
  };
}

PostDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.object,
  data: PropTypes.object,
  post: PropTypes.object,
  auth: PropTypes.object,
  // post: PropTypes.shape({
  //   _id: PropTypes.number.isRequired,
  //   title: PropTypes.string.isRequired,
  //   mediaContent: PropTypes.string,
  //   numComment: PropTypes.number.isRequired,
  //   point: PropTypes.number.isRequired,
  //   created: PropTypes.string.isRequired,
  //   view: PropTypes.number.isRequired,
  //   creator: PropTypes.object.isRequired,
  // }).isRequired,
};

export default connect(mapStateToProps)(PostDetail);
