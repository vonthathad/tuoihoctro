import React, { PropTypes } from 'react';

// Import Components
import PostListItem from './PostListItem/PostListItem';
// Import Styles
import styles from './PostListItem/PostListItem.css';
function PostList(props) {
  return (
    <div className={`col-sm-8 ${styles['col-sm-8']}`} id={styles.left}>

    {
        props.posts.map(post => (
          <PostListItem
            post={post}
            key={post.id}
            onDelete={() => props.handleDeletePost(post.cuid)}
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
      username: PropTypes.string.isRequired,
    },
  })).isRequired,
  handleDeletePost: PropTypes.func.isRequired,
};

export default PostList;
