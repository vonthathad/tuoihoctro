import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './PostListItem.css';
import thump from '../../../../../assets/img/thump.jpg';
import icons from '../../../../../assets/css/icon.css';

function PostListItem(props) {
  return (
    <div className={styles['single-post']}>
      <h3 className={styles['post-title']}>
        <Link to={`/posts/${props.post['_id']}`}>
          {props.post.title}
        </Link>
      </h3>
      <p className={styles['author-name']}><FormattedMessage id="by" /> {props.post.creator.username}</p>
      <img src={thump} alt="" />

      <div className={styles['post-body']}>
        <div className={styles['post-info']}>
          <p>
            1 Bình luận - 3 Lượt thích
          </p>
        </div>
        <div className={styles['post-action']}>
          <a href="" className="btn btn-default">
            <i className="glyphicon glyphicon-arrow-up"></i>
          </a>

          <a href="" className="btn btn-default">
            <i className="glyphicon glyphicon-arrow-down"></i>
          </a>

          <a href="" className="btn btn-default">
            <i className="glyphicon glyphicon-comment"></i>
          </a>
        </div>
        <div className={styles['post-social']}>
          <a className="btn btn-default">
            <i className={`${icons.fa} ${icons['fa-twitter']}`}></i>
            <span className="remove-mobile">Twitter</span>
          </a>

          <a className="btn btn-default">
            <i className={`${icons.fa}  ${icons['fa-facebook']}`}></i>
            <span className="remove-mobile">Facebook</span>
          </a>

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
    creator: {
      avatar: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired
    }
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PostListItem;
