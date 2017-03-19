import React, { PropTypes } from 'react';
import styles from './index.css';
import { Link } from 'react-router';

function RecommendListItem(props) {
  return (
    <Link to={`posts/${props.post._id}`}>
      <div className={styles['featured-post']}>
        <div className={styles['featured-image']}>
          <img src={props.post.smallThumb} alt="" />
        </div>
        <div className={styles['featured-title']}>
          <h2>{props.post.title}</h2>
        </div>
      </div>
    </Link>
  );
}

RecommendListItem.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    smallThumb: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecommendListItem;
