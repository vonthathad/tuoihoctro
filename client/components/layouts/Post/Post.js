import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import TwitterHeart from '../../decorations/TwitterHeart/TwitterHeart';
// Import Style
import styles from './index.css';
// import icons from '../../../../../assets/css/icon.css';
function Post(props) {
  // console.log(props);
  return (
    <div className={styles['post-box']}>
      <div className={styles['post-header']}>
        <div className={styles['post-title']}>
          <h1>
            <Link to={`posts/${props.post._id}`}>
              {props.post.title}
            </Link>
          </h1>
        </div>
      </div>
      <div className={styles['post-left']}>

        <div className={styles.post}>
          {props.children}
        </div>

        <div className={styles['post-footer']}>
          <div className={styles['box-vote']}>
            <div className={styles['twitter-heart-wrapper']}>
              <TwitterHeart _id={props.post._id} check={false} />
            </div>
            <div className={styles['vote-number-wrapper']}>
              <span> {props.post.point} </span>
            </div>
          </div>
          <a className={styles['box-comment']}>
            <div className={styles['comment-icon-wrapper']}>
              <i className="fa fa-comment-o" aria-hidden="true"></i>
            </div>
            <div className={styles['comment-number-wrapper']}>
              <span> {props.post.point} </span>
            </div>
          </a>
          <div className={styles['box-facebook']}>
            <a className={`${styles['fb-button']}`}>
              <i className="fa fa-facebook"></i>
              <span className={styles['remove-mobile']}> Facebook</span>
            </a>
          </div>
          {/* <div className={styles['social-button']}>*/}
          {/**/}
          {/* </div>*/}
        </div>
      </div>
    </div>
  );
}
Post.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    thumb: PropTypes.string.isRequired,
    point: PropTypes.number.isRequired,
    view: PropTypes.number.isRequired,
  }).isRequired, children: PropTypes.node.isRequired,
};
export default Post;
