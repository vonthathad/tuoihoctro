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
  }
  shouldComponentUpdate(nextProps) {
    // if (this.props.post !== nextProps.post) return false;
    return true;
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
                <i className="fa fa-comment-o" aria-hidden="true"></i>
              </Link>
              <div className={st['comment-number-wrapper']}>
                <span> {point} </span>
              </div>
            </div>
            <div className={st['box-facebook']}>
              <a className={`${st['fb-button']}`}>
                <i className="fa fa-facebook"></i>
                <span className={st['remove-mobile']}> Facebook</span>
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
