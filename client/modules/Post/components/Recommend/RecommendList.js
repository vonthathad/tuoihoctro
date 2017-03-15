import React, { PropTypes } from 'react';

// Import Components
import RecommendListItem from './RecommendListItem/RecommendListItem';

import styles from './RecommendList.css';

function RecommendList(props) {
  return (
    <div className="col-sm-4">
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
  })).isRequired,
};

export default RecommendList;
