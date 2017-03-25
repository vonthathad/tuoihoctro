import React, { PropTypes } from 'react';
import ImagePrettyLoad from '../ImagePrettyLoad/ImagePrettyLoad';
import VideoAutoPlay from '../VideoAutoPlay/VideoAutoPlay';
import Post from '../Post/Post';
import './index.css';
const PostsChunk = ({ posts, loading, _window }) => (
  <div>
    {loading && < h2 > Loading...</h2>}
    {!loading && posts && posts.length > 0 && posts.map(post => (
      <Post post={post}>
        {post.type.indexOf('gif') === -1 ? <ImagePrettyLoad
          key={post._id}
          image={post.thumb}
          imageLQ={post.thumbLQ}
          imageHeight={post.thumbHeight}
          imageWidth={post.thumbWidth}
          width={550}
        /> : <VideoAutoPlay
          key={post._id}
          videoSrc={post.thumb}
          videoHeight={post.thumbHeight}
          videoWidth={post.thumbWidth}
          width={550}
          _window={_window}
        />
        }
      </Post>
    ))
    }
  </div >
);
PostsChunk.propTypes = {
  posts: PropTypes.array.isRequired, loading: PropTypes.bool.isRequired,
};
export default PostsChunk;
