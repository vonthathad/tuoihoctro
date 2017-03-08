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
        <Link to={`/posts/${props.post.slug}-${props.post.cuid}`}>
          {props.post.title}
        </Link>
      </h3>
      <p className={styles['author-name']}><FormattedMessage id="by" /> {props.post.name}</p>
      <img src={thump} alt="" />

      <div className={styles['post-body']}>
        <div className={styles['post-info']}>
          <p>
            1 Bình luận - 3 Lượt thích
          </p>
        </div>
        <div className={styles['post-action']}>
          <a href="" className={`${styles.btn}  ${styles['btn-default']}`}>
            <i className={`${icons.glyphicon} ${icons['glyphicon-arrow-up']}`}></i>
          </a>

          <a href="" className={`${styles.btn}  ${styles['btn-default']}`}>
            <i className={`${icons.glyphicon} ${icons['glyphicon-arrow-down']}`}></i>
          </a>

          <a href="" className={`${styles.btn} ${styles['btn-default']}`}>
            <i className={`${icons.glyphicon}  ${icons['glyphicon-comment']}`}></i>
          </a>
        </div>
        <div className={styles['post-social']}>
          <a className={`${styles.btn} ${styles['btn-default']}`}>
            <i className={`${icons.fa} ${icons['fa-twitter']}`}></i>
            <span className="remove-mobile">Twitter</span>
          </a>

          <a className={`${styles.btn} ${styles['btn-default']}`}>
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
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PostListItem;
