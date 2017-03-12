import React, { PropTypes } from 'react';

// Import Components
import PostListItem from './PostListItem/PostListItem';
// Import Styles
import styles from './PostListItem/PostListItem.css';
function PostList(props) {
  return (
    <div className="col-md-8" id={styles.left}>

    {
        props.posts.map(post => (
          <PostListItem
            post={post}
            key={post.cuid}
            onDelete={() => props.handleDeletePost(post.cuid)}
          />
        ))
      }
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  handleDeletePost: PropTypes.func.isRequired,
};

export default PostList;
