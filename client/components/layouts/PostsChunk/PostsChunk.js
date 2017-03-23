import React, { PropTypes } from 'react';
import ImagePrettyLoad from '../ImagePrettyLoad/ImagePrettyLoad';
import VideoAutoPlay from '../VideoAutoPlay/VideoAutoPlay';
import Post from '../Post/Post';
import './index.css';
const PostsChunk = ({ posts, loading, _window }) => {
  // console.log(posts);
  // console.log(loading);
  const containerWidth = 500;
  return (
    <div>
      {loading && < h2 > Loading...</h2>}
      {!loading && posts && posts.length > 0 && posts.map((post, i) => (
        <Post post={post} key={i}>
          {post.type.indexOf('gif') === -1 ? <ImagePrettyLoad
            key={post._id}
            image={post.thumb}
            imageLQ={post.thumbLQ}
            imageHeight={post.thumbHeight}
            imageWidth={post.thumbWidth}
            containerWidth={containerWidth}
          /> : <VideoAutoPlay
            key={post._id}
            videoSrc={post.thumb}
            videoHeight={post.thumbHeight}
            videoWidth={post.thumbWidth}
            containerWidth={containerWidth}
            _window={_window}
          />
          }
        </Post>
      ))
      }
    </div >
  );
}
  ;
PostsChunk.propTypes = {
  posts: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  _window: PropTypes.object.isRequired,
};
export default PostsChunk;
