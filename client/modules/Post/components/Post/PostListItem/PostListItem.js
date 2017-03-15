import React, { PropTypes } from 'react';

// Import Style
import styles from './PostListItem.css';
import thump from '../../../../../assets/img/thump.jpg';
import icons from '../../../../../assets/css/icon.css';

function PostListItem(props) {
  return (
    <div className={styles['post-box']}>
      <header className={styles['post-header']}>
        <div className={styles['post-title']}>
          <h1>
            <a>
              {props.post.title}
            </a>
          </h1>
        </div>
        <div className={styles['post-footer']}>518 lượt xem - 1 bình luận</div>
      </header>
      <div className={styles['post-left']}>

        <div className={styles.post}>
          <img className={styles['img-responsive']} src={thump} alt="" />
        </div>

        <div className={styles['vote-box']}>
          <a className="btn btn-default glyphicon glyphicon-heart-empty"></a>
          <a className="btn btn-default glyphicon glyphicon-thumbs-down"></a>
          <span className={styles['display-vote']}>0 điểm</span>
        </div>

        <div className={styles['social-box']}>
          <a className={`btn btn-default ${styles['twitter-button']}`}><span
            className={`${icons.fa} ${icons['fa-twitter']}`}
          ></span><span
            className={styles['remove-mobile']}
          > Twitter</span></a>
          <a className={`btn btn-default ${styles['fb-button']}`}><span
            className={`${icons.fa} ${icons['fa-facebook']}`}
          ></span><span
            className={styles['remove-mobile']}
          > Facebook</span></a>
        </div>
      </div>

    </div>
  );
}

PostListItem.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    mediaContent: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    thumb: PropTypes.string.isRequired,
    smallThumb: PropTypes.string.isRequired,
    numComment: PropTypes.number.isRequired,
    point: PropTypes.number.isRequired,
    created: PropTypes.string.isRequired,
    view: PropTypes.number.isRequired,
    smallThumbWidth: PropTypes.number.isRequired,
    smallThumbHeight: PropTypes.number.isRequired,
    thumbWidth: PropTypes.number.isRequired,
    thumbHeight: PropTypes.number.isRequired,
    mediaContentWidth: PropTypes.number.isRequired,
    mediaContentHeight: PropTypes.number.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PostListItem;
