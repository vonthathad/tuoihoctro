import React, { PropTypes } from 'react';

// Import Components
import RecommendListItem from './RecommendListItem/RecommendListItem';

import styles from './RecommendList.css';

function RecommendList(props) {
  return (
    <div className={`col-sm-4 ${styles['col-sm-4']}`}>
      <div id={styles['featured-box']}>
        <div className={styles['right-bar-title']}>
          <h1>Bài liên quan</h1>
        </div>
        {
          props.posts.map(post => (
            <RecommendListItem
              post={post}
              key={post._id}
            />
          ))
        }
      </div>
    </div>
  );
}

RecommendList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    smallThumb: PropTypes.string.isRequired,
    numComment: PropTypes.number.isRequired,
  })).isRequired,
};

export default RecommendList;
