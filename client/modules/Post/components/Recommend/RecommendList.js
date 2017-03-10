import React, { PropTypes } from 'react';

// Import Components
import RecommendListItem from './RecommendListItem/RecommendListItem';

import styles from './RecommendList.css';

function RecommendList(props) {
  return (
    <div className="col-md-4">
      <div className={styles['recommend-top']}>
        <h3>
         Recommends
        </h3>
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
