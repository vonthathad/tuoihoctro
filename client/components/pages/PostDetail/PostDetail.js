import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
// import { browserHistory } from 'react-router';
// Import Components
// import RecommendList from '../../layouts/RecommendsListContainer/RecommendsListContainer';


import RecommendsList from '../../layouts/RecommendsList/RecommendsList';
import ImagePrettyLoad from '../../layouts/ImagePrettyLoad/ImagePrettyLoad';
import VideoAutoPlay from '../../layouts/VideoAutoPlay/VideoAutoPlay';
import GoogleAd from '../../advert/advert';

import Helmet from 'react-helmet';
// Import Style
import st from './PostDetail.css';

// Import Actions
import {
  _fetchPost,
  votePost,
  deletePostRequest,
  tempVoteDetailSuccess,
  _fetchPostClient,
} from '../../../_actions/PostsActions';

// import { getPost, getPosts } from '../../../_reducers/PostsReducer';

export class PostDetail extends Component {
  static need = [params => {
    return _fetchPost(params.postId);
  }];

  constructor(props) {
    super(props);
    this.handleVoteClick = this.handleVoteClick.bind(this);
    this.state = {
      post: null,
    };
    this.handleShareFb = this.handleShareFb.bind(this);
    this.fetchPost = this.fetchPost.bind(this);
    this.baseUrl = typeof (window) !== 'undefined' ? `${window.location.protocol}//${window.location.hostname}` : `${process.env.PROTOCOL}//${process.env.DOMAIN}`;
    // this.next = this.next.bind(this);
    this.next = this.next.bind(this);
    this.timeSince = this.timeSince.bind(this);
    // console.log(this.baseUrl);
  }

  componentDidMount() {
    if (window.FB) {
      window.FB.XFBML.parse(this.commentsCountRef);
      window.FB.XFBML.parse(this.commentRef);
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
    // console.log(prevProps);
    // console.log(this.props);
    const oldId = prevProps.params.postId;
    const newId = this.props.params.postId;
    if (newId !== oldId) {
      window.scrollTo(0, 0);
      // this.props.dispatch(_fetchPost(this.props.params.postId));
      // this.fetchPost();
    }
    if (this.props.post._id !== prevProps.post._id) {
      if (window.FB) {
        window.FB.XFBML.parse(this.commentsCountRef);
        window.FB.XFBML.parse(this.commentRef);
      }
    }
  }

  fetchPost() {
    !this.props.post._id && this.props.dispatch(_fetchPost(this.props.params.postId));
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
    const newWindow = window.open(`https://www.facebook.com/sharer/sharer.php?u=${this.baseUrl}/posts/${this.props.post._id}`, 'facebook-share-dialog', `scrollbars=yes, width=${w}, height=${h}, top=${top}, left=${left}`);

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

  next() {
    // console.log(this.props.post.id);
    const id = this.props.post._id;
    const posts = this.props.posts;
    const length = posts.length;
    let nextId = 0;
    // console.log(this.props.posts);
    let inRecommends = false;
    for (let i = 0; i < length; i++) {
      if (posts[i]._id === parseInt(id, 10)) {
        // console.log(1235);
        if (i === length - 1) i = 0;
        else i++;
        this.props.dispatch(_fetchPostClient(posts[i]));
        nextId = posts[i]._id;
        inRecommends = true;
        break;
      }
    }
    if (!inRecommends) {
      // console.log(this.props.post);
      // console.log(posts);
      // console.log(id);
      // console.log(posts[0]._id);
      this.props.dispatch(_fetchPostClient(posts[0]));
    }
    history.pushState(null, null, `/posts/${nextId}`);
    // browserHistory.go(`/posts/${id + 1}`);
  }

  timeSince(date) {
    const seconds = Math.floor((new Date() - date) / 1000);

    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return `${interval} năm`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return `${interval} tháng`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return `${interval} ngày`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return `${interval} giờ`;
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return `${interval} phút`;
    }
    return `${Math.floor(seconds)} năm`;
  }

  render() {
    // console.log(this.props);
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
    console.log(this.props.post);
    return (
      <div className="container">
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
              /* {
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
                name: 'og:image',
                content: 'https://www.shoutmeloud.com/wp-content/uploads/2010/05/facebook-login.png',
              },
              {
                property: 'og:title',
                content: `${post.title}`,
              },*/
              {
                property: 'og:title',
                content: `${post.title}`,
              },
              {
                property: 'og:image',
                content: 'https://www.shoutmeloud.com/wp-content/uploads/2010/05/facebook-login.png',
              },
              {
                property: 'og:type',
                content: 'video.movie',
              },
              {
                property: 'og:video:url',
                content: 'https://www.ipgmediabrands.com/wp-content/uploads/APAC_720_COMPRESSED.mp4.mp4',
              },
              {
                property: 'og:video:secure_url',
                content: 'https://www.ipgmediabrands.com/wp-content/uploads/APAC_720_COMPRESSED.mp4.mp4',
              },
              {
                property: 'og:video:type',
                content: ' video/mp4',
              },
              {
                property: 'og:url',
                content: `http://tuoihoctro.co/posts/${post._id}`,
              },
            ]}
          />
        }

        <div className={`col-sm-8 ${st['col-sm-8']}`}>
          {
            (post && post.title)
              ? <div className={st['post-content-box']}>
                <header className={st['post-header']}>
                  <div className={st['post-title']}>
                    <h1>{post.title}</h1>
                  </div>
                  <div className={st['post-footer']}>
                    <span className={st['display-vote']}>{post.votesLength} điểm</span> - {post.viewsLength} lượt xem
                  </div>
                  {/* <p className={st.smallText} ref={commentsCountRef => {
                   this.commentsCountRef = commentsCountRef;
                   }}>
                   {post.point} điểm - <span className="fb-comments-count"
                   data-href={`${this.baseUrl}/posts/${post._id}`}></span> bình luận
                   </p>*/}
                </header>

                <div className={st['post-action']}>
                  <div className={st['social-box-top']}>
                    <div className={voted ? st.votedButton : st.unvotedButton} onClick={this.handleVoteClick}>
                      <span>Thích</span>
                    </div>
                    <div className={st.shareButton} onClick={this.handleShareFb}>
                      Facebook
                    </div>
                    <div className={st.nextButton} onClick={this.next}>
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
                      ? <div className={st['bottom-share']}>
                        <a href="" onClick={this.deletePostByOwner.bind(this, post._id)}>
                          Delete this post
                        </a>
                      </div>
                      : null
                  }
                  {/* <div className={st['clear-fix']}></div>*/}
                  {/* <div className={st['ads-under-share']}>
                    <GoogleAd
                      client="ca-pub-8167045239596974"
                      slot="4898417443"
                      format="auto"
                    />
                  </div>*/}
                  <div className={st.shareButtonLarge} onClick={this.handleShareFb}>
                    Chia sẻ Facebook
                    {/* <div className="fb-share-button" data-href={window.location.href} data-layout="button_count" data-size="small" data-mobile-iframe="true">
                     <a className="fb-xfbml-parse-ignore" target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}>Share</a>
                     </div>*/}
                  </div>
                  <div className={st['post-date']}>
                    <abbr className={st['time-ago']}>{this.timeSince(new Date(post.created))} trước</abbr> bởi
                    <a className={st['user-link']}> {post.creator.username}</a>
                  </div>
                  <RecommendsList numComments={9} type={'horizontal'} notInclude={post._id} />
                </div>
              </div>
              : <div className={st.loading}>Loading&#8230;</div>
          }
        </div>
        <div className={`col-sm-4 ${st['col-sm-4']}`}>
          <div
            className={st['facebook-comments']}
            ref={commentRef => {
              this.commentRef = commentRef;
            }}
          >
            <span style={{ display: 'none' }} className="fb-comments-count" data-href="http://example.com/"></span>
            <div
              className="fb-comments"
              data-href={`${this.baseUrl}/posts/${post._id}`}
              data-numposts="10"
              width="100%" data-order-by="social"
            ></div>
          </div>
          <div className={st.sideAd}>
            {/* <GoogleAd
              client="ca-pub-8167045239596974"
              slot="4898417443"
              format="auto"
            />*/}
          </div>
        </div>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    posts: state.recommendsStore.recommendsList.posts,
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
  posts: PropTypes.array,
};

export default connect(mapStateToProps)(PostDetail);
