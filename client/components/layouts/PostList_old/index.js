import React, { PropTypes } from 'react';

// Import Components
import PostListItem from '../../components-sub/postListItem';
// Import Styles
import styles from '../postListItem/index.css';
function PostList(props) {
  return (
    <div className={`col-sm-8 ${styles['col-sm-8']}`} id={styles.left}>
    {
        props.posts.map(post => (
          <PostListItem
            post={post}
            key={post._id}
          />
        ))
      }
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    thumb: PropTypes.string.isRequired,
    point: PropTypes.number.isRequired,
    view: PropTypes.number.isRequired,
  })).isRequired,
};

export default PostList;
