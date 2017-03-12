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
              key={post.cuid}
            />
          ))
        }
      </div>
    </div>
  );
}

RecommendList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
};

export default RecommendList;
