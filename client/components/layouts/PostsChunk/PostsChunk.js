import React, { Component, PropTypes } from 'react';
import ImagePrettyLoad from '../ImagePrettyLoad/ImagePrettyLoad';
import VideoAutoPlay from '../VideoAutoPlay/VideoAutoPlay';
import Post from '../Post/Post';
import './index.css';

class PostsChunk extends Component {
  // console.log(posts);
  // console.log(loading);
  constructor(props) {
    super(props);
    this.handlePostWrapperResize = this.handlePostWrapperResize.bind(this);
  }

  componentDidMount() {
    const width = parseInt(window.getComputedStyle(this.postWrapperRef, null).getPropertyValue('width').replace('px', ''), 10);
    this.containerWidth = width < 500 ? width : 500;
    // console.log(width);
    window.addEventListener('resize', this.handlePostWrapperResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handlePostWrapperResize);
  }

  handlePostWrapperResize() {
    const width = parseInt(window.getComputedStyle(this.postWrapperRef, null).getPropertyValue('width').replace('px', ''), 10);
    this.containerWidth = width < 500 ? width : 500;
  }

  render() {
    const { posts, loading, _window } = this.props;
    return (
      <div
        ref={(postWrapperRef) => {
          this.postWrapperRef = postWrapperRef;
        }}
      >
        {loading && < h2 > Loading...</h2>}
        {!loading && posts && posts.length > 0 && posts.map((post, i) => (
          <Post post={post} key={i}>
            {post.type.indexOf('gif') === -1 ? <ImagePrettyLoad
              key={post._id}
              image={post.thumb}
              imageLQ={post.thumbLQ}
              imageHeight={post.thumbHeight}
              imageWidth={post.thumbWidth}
              containerWidth={this.containerWidth}
            /> : <VideoAutoPlay
              key={post._id}
              videoSrc={post.thumb}
              videoHeight={post.thumbHeight}
              videoWidth={post.thumbWidth}
              containerWidth={this.containerWidth}
              _window={_window}
            />
            }
          </Post>
        ))
        }
      </div >
    );
  }
}
PostsChunk.propTypes = {
  posts: PropTypes.array.isRequired, loading: PropTypes.bool.isRequired, _window: PropTypes.object.isRequired,
};
export default PostsChunk;
