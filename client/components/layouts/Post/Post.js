import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import TwitterHeart from '../../decorations/TwitterHeart/TwitterHeart';
// Import Style
import st from './index.css';
import { _fetchPostsChunk,voteUpPost } from '../../../_actions/PostsActions';

class Post extends Component {

  handleVoteClick(id) {
    this.props.dispatch(voteUpPost(id))
  };
  // console.log(props);
  render() {
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
          <div className={st['post-footer']}>
            <div className={st['box-vote']}>
              <div className={st['twitter-heart-wrapper']} onClick={this.handleVoteClick.bind(this, this.props.post._id)} >
                <TwitterHeart _id={this.props.post._id} checked={false} />
              </div>
              <div className={st['vote-number-wrapper']}>
                <span> {this.props.post.point} </span>
              </div>
            </div>
            <div className={st['box-comment']}>
              <Link to={`posts/${this.props.post._id}`} className={st['comment-icon-wrapper']}>
                <i className="fa fa-comment-o" aria-hidden="true"></i>
              </Link>
              <div className={st['comment-number-wrapper']}>
                <span> {this.props.post.point} </span>
              </div>
            </div>
            <div className={st['box-facebook']}>
              <a className={`${st['fb-button']}`}>
                <i className="fa fa-facebook"></i>
                <span className={st['remove-mobile']}> Facebook</span>
              </a>
            </div>
            {/* <div className={st['social-button']}>*/}
            {/**/}
            {/* </div>*/}
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
    liked: PropTypes.boolean
  }).isRequired, children: PropTypes.node.isRequired,
};
export default Post;
