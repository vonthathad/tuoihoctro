import React, { PropTypes } from 'react';
import { Link } from 'react-router';
// Import Style
import styles from './index.css';
// import icons from '../../../../../assets/css/icon.css';

function Post(props) {
  // console.log(props);
  return (
    <div className={styles['post-box']}>
      <header className={styles['post-header']}>
        <div className={styles['post-title']}>
          <h1>
            <Link to={`posts/${props.post._id}`} >
              {props.post.title}
            </Link>
          </h1>
        </div>
        <div className={styles['post-footer']}>{props.post.view} lượt xem - 1 bình luận</div>
      </header>
      <div className={styles['post-left']}>

        <div className={styles.post}>
          {props.children}
        </div>

        <div className={styles['vote-box']}>
          <a className={`${styles.thumbup} ${styles['emotion-button']}`}><i className="fa fa-heart-o" aria-hidden="true"></i></a>
          <a className={`${styles.thumbup} ${styles['emotion-button']}`}><i className="fa fa-heart" aria-hidden="true"></i></a>
          <a className={`${styles.thumbdown} ${styles['emotion-button']}`}><i className="fa fa-thumbs-o-down" aria-hidden="true"></i></a>

          <span>{props.post.point} điểm</span>
        </div>

        <div className={styles['social-box']}>
          <a className="btn btn-default fb-button">
            <span className="fa fa-facebook"  ></span>
            <span className={styles['remove-mobile']} > Facebook</span>
          </a>
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
  }).isRequired,
};

export default Post;
