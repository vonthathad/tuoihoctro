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
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecommendListItem;
