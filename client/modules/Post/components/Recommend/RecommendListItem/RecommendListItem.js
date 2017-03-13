import React, { PropTypes } from 'react';
// import { Link } from 'react-router';
// import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './RecommendListItem.css';
import thump from '../../../../../assets/img/thump.jpg';

function RecommendListItem(props) {
  return (
    <a href="">
      <div className={styles['featured-post']}>
        <div className={styles['featured-image']}>
          <img src={thump} alt="" />
        </div>
        <div className={styles['featured-title']}>
          <h2>{props.post.title}</h2>
        </div>
      </div>
    </a>
  );
}

RecommendListItem.propTypes = {
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
};

export default RecommendListItem;
