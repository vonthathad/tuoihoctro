import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
// Import Components
// import RecommendList from '../../layouts/RecommendsListContainer/RecommendsListContainer';

import RecommendsList from '../../layouts/RecommendsList/RecommendsList';
import ImagePrettyLoad from '../../layouts/ImagePrettyLoad/ImagePrettyLoad';
import VideoAutoPlay from '../../layouts/VideoAutoPlay/VideoAutoPlay';

import Helmet from 'react-helmet';
// Import Style
import st from './PostDetail.css';

// Import Actions
import { _fetchPost, votePost, deletePostRequest, tempVoteDetailSuccess } from '../../../_actions/PostsActions';

// import { getPost, getPosts } from '../../../_reducers/PostsReducer';

export class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.handleVoteClick = this.handleVoteClick.bind(this);
    this.state = {
      post: null,
    };
    // this.url = window.location.hostname + window.location.pathname;
    this.handleShareFb = this.handleShareFb.bind(this);
    this.fetchPost = this.fetchPost.bind(this);
    this.baseUrl = typeof(window) !== 'undefined' ? `${window.location.protocol}//${window.location.hostname}` : `${process.env.PROTOCOL}//${process.env.DOMAIN}`;
    console.log(this.baseUrl);
  }
  componentDidMount() {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
    window.scrollTo(0, 0);
    this.fetchPost();
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(nextProps);
    // if (this.props.posts.length > 0 && nextProps.posts) {
    //   const posts = this.props.posts;
    //   const postsLength = posts.length;
    //   const postId = this.props.params.postId;
    //   for (let i = 0; i < postsLength; i++) {
    //     if (posts[i]._id === parseInt(postId, 10)) {
    //       // console.log(i);
    //       if (this.props.posts[i].votes === nextProps.posts[i].votes) {
    //         return true;
    //       }
    //     }
    //   }
    // }
    // if (nextState.post === this.state.post
    //   && this.state.post !== null
    //   && nextState.post.votes === this.state.post.votes) return false;
    // && this.props.posts[postId].votes === nextProps.posts[postId].votes
  //   return true;
  // }
  componentDidUpdate(prevProps) {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
    // console.log(prevProps);
    // console.log(this.props);
    const oldId = prevProps.params.postId;
    const newId = this.props.params.postId;
    if (newId !== oldId) {
      window.scrollTo(0, 0);
      // this.props.dispatch(_fetchPost(this.props.params.postId));
      // this.fetchPost();
    }
    // if (!this.props.post) {
    //   this.props.dispatch(_fetchPost(this.props.params.postId));
    // } else {
    //   if (this.props.params.postId !== this.props.post._id) {
    //     this.props.dispatch(_fetchPost(this.props.params.postId));
    //   }
    // }
  }
  fetchPost() {
    // console.log(this.props.posts);
    // if (this.props.posts.length !== 0) {
    //   const posts = this.props.posts;
    //   const postsLength = posts.length;
    //   for (let i = 0; i < postsLength; i++) {
    //     if (posts[i]._id === parseInt(this.props.params.postId, 10)) {
    //       this.setState({ post: posts[i] });
    //       break;
    //     }
    //   }
    // } else {
    // console.log(this.props.post.title);
    !this.props.post._id && this.props.dispatch(_fetchPost(this.props.params.postId));
    // }
  }
  deletePostByOwner(id) {
    this.props.dispatch(deletePostRequest(id));
  }
  handleShareFb() {
    let w = '626';
    let h = '436';
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
      w = '400';
      h = '300';
    }
    // Fixes dual-screen position                         Most browsers      Firefox
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;

    let width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth;
    width = document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    let height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight;
    height = document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    const left = ((width / 2) - (w / 2)) + dualScreenLeft;
    const top = ((height / 2) - (h / 2)) + dualScreenTop;
    const newWindow = window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, 'facebook-share-dialog', `scrollbars=yes, width=${w}, height=${h}, top=${top}, left=${left}`);

    if (window.focus) {
      newWindow.focus();
    }
  }
  handleVoteClick() {
    // console.log(this.props.auth._id);
    const post = this.props.post;
    this.props.dispatch(tempVoteDetailSuccess({
      userId: this.props.auth._id,
      postId: post._id,
      postVotes: post.votes,
    }));
    this.props.dispatch(votePost({
      userId: this.props.auth._id,
      postId: post._id,
      postVotes: post.votes,
    }));
  }
  readBack(id) {
    this.props.dispatch(_fetchPost(id - 1));
  }
  readNext(id) {
    browserHistory.go(`/posts/${id + 1}`);
  }
  render() {
    console.log(this.props);
    const post = this.props.post;
    let voted = false;
    if (post) {
      post.votes &&
      post.votes.forEach(id => {
        if (id === this.props.auth._id) {
          voted = true;
        }
      });
    }
    return (
      <div id={st.wrap}>
        {post && post.title &&
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
        }
        <div className={`container ${st.postDetailWrapper}  ${st.pr0}`}>
          <div className="col-sm-8" id={st.left}>
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
                      <div className={voted ? st.votedButton : st.unvotedButton} onClick={this.handleVoteClick} >
                        <span>Thích</span>
                      </div>
                      <div className={st.shareButton} onClick={this.handleShareFb}>
                        Chia sẻ
                        {/* <div className={st.shareButton2} >*/}
                        {/* <div className="fb-share-button" data-href={this.url} data-layout="button_count" data-size="large" data-mobile-iframe="true">
                            <a className="fb-xfbml-parse-ignore" target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${this.url}`}>Share</a>
                          </div>*/}
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
                  </div>
                  <div className={st['clear-fix']}></div>
                  <div className={st.shareButtonLarge} onClick={this.handleShareFb} >
                    Chia sẻ
                      {/* <div className="fb-share-button" data-href={window.location.href} data-layout="button_count" data-size="small" data-mobile-iframe="true">
                        <a className="fb-xfbml-parse-ignore" target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}>Share</a>
                      </div>*/}
                  </div>
                  <RecommendsList numComments={3} />
                </div>
                : <div className={st.loading}>Loading&#8230;</div>
            }
          </div>
          <div className={`col-sm-4 ${st.pr0} ${st.mt10}`}>
            <div className={st['facebook-comments']}>
              <span style={{ display: 'none' }} className="fb-comments-count" data-href="http://example.com/"></span>
              <div className="fb-comments" data-href={`${this.baseUrl}/posts/${post._id}`} data-numposts="10" width="100%"></div>
            </div>
            <div className={st.sideAd}>
              <img src="https://s1.2mdn.net/3797665/300x600_Korean.jpg" alt="" />
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
};

export default connect(mapStateToProps)(PostDetail);
