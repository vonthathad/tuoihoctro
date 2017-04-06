import React, { Component, PropTypes } from 'react';
import ImagePrettyLoad from '../ImagePrettyLoad/ImagePrettyLoad';
import VideoAutoPlay from '../VideoAutoPlay/VideoAutoPlay';
import Post from '../Post/Post';
import './index.css';

class PostsChunk extends Component {
  componentDidMount() {
    const width = parseInt(window.getComputedStyle(this.postWrapperRef, null).getPropertyValue('width').replace('px', ''), 10);
    this.containerWidth = width < 500 ? width : 500;
  }
  render() {
    const { posts, loading, auth, dispatch } = this.props;
    return (
      <div
        ref={(postWrapperRef) => {
          this.postWrapperRef = postWrapperRef;
        }}
      >
        {loading && <h2> Loading...</h2>}
        {!loading && posts && posts.length > 0 && posts.map((post, i) => {
          return (<Post post={post} key={i} dispatch={dispatch} auth={auth}>
            {post.type.indexOf('gif') === -1 ? <ImagePrettyLoad
              key={post._id}
              image={post.thumb}
              imageLQ={post.thumbLQ}
              imageHeight={post.thumbHeight}
              imageWidth={post.thumbWidth}
              containerWidth={this.containerWidth}
            />
              :
              <VideoAutoPlay
                key={post._id}
                videoSrc={post.thumb}
                videoHeight={post.thumbHeight}
                videoWidth={post.thumbWidth}
                containerWidth={this.containerWidth}
              />
            }
          </Post>);
        })
        }
      </div >
    );
  }
}
PostsChunk.propTypes = {
  dispatch: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  auth: PropTypes.object.isRequired,
};
export default PostsChunk;
