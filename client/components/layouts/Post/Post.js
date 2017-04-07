import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import TwitterHeart from '../../decorations/TwitterHeart/TwitterHeart';
// Import Style
import st from './index.css';
import { votePost, tempVoteSuccess } from '../../../_actions/PostsActions';
class Post extends Component {
  constructor(props) {
    super(props);
    this.handleVoteClick = this.handleVoteClick.bind(this);
    this.handleShareFb = this.handleShareFb.bind(this);
    // console.log(`${window.location.href}posts/${this.props.post._id}`);
  }
  componentDidMount() {
    if (window.FB) {
      window.FB.XFBML.parse(this.commentCountRef);
    }
  }
  shouldComponentUpdate(nextProps) {
    if (this.props.post !== nextProps.post) return false;
    return true;
  }
  componentDidUpdate() {
    // if (window.FB) {
    //   window.FB.XFBML.parse();
    // }
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
  render() {
    const post = this.props.post;
    let voted = false;
    post.votes.forEach(id => {
      if (id === this.props.auth._id) {
        voted = true;
      }
    });
    const point = this.props.post.votes.length;
    return (
      <div className={st['post-box']}>
        <div className={st['post-header']}>
          <div className={st['post-title']}>
            <h1>
              <Link to={`posts/${this.props.post._id}`}>
                {this.props.post.title}
              </Link>
            </h1>
          </div>
        </div>
        <div className={st['post-left']}>

          <div className={st.post}>
            {this.props.children}
          </div>
          {this.props.post.type === 'list' &&
            <a className={st['read-more']}>
              Xem thêm
            </a>
          }
          <div>{voted}</div>
          <div className={st['post-footer']}>
            <div className={st['box-vote']}>
              <div className={st['twitter-heart-wrapper']} >
                <TwitterHeart _id={this.props.post._id} checked={voted} handleClick={this.handleVoteClick} />
              </div>
              <div className={st['vote-number-wrapper']}>
                <span> {point} </span>
              </div>
            </div>
            <div className={st['box-comment']}>
              <Link to={`posts/${this.props.post._id}`} className={st['comment-icon-wrapper']}>
                <i className="fa fa-comment" aria-hidden="true"></i>
              </Link>
              <div className={st['comment-number-wrapper']} ref={(commentCountRef) => { this.commentCountRef = commentCountRef; }}>
                <span className="fb-comments-count" data-href={`${window.location.href}posts/${this.props.post._id}`}></span>
              </div>
            </div>
            <div className={st['box-facebook']} onClick={this.handleShareFb}>
              <a className={`${st['fb-button']}`}>
                <i className="fa fa-facebook"></i>
                <span className={st['remove-mobile']}> Facebook</span>
                {/* <div className="fb-share-button" data-href={`${window.location.href}posts/${this.props.post._id}`} data-layout="button_count" data-size="large" data-mobile-iframe="true">
                <a className="fb-xfbml-parse-ignore" target="_blank" href={`${window.location.href}posts/${this.props.post._id}`}>Share</a>
              </div>*/}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Post.propTypes = {
  dispatch: PropTypes.func.isRequired,
  post: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    thumb: PropTypes.string.isRequired,
    point: PropTypes.number.isRequired,
    view: PropTypes.number.isRequired,
    votes: PropTypes.array.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
  auth: PropTypes.objectOf(PropTypes.shape({
    _id: PropTypes.number,
  })),
};
export default Post;
