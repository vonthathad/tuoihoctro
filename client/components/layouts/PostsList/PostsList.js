import React, { Component, PropTypes } from 'react';
// import PostsChunk from '../PostsChunk/PostsChunk';
import { Link } from 'react-router';
import ImagePrettyLoad from '../ImagePrettyLoad/ImagePrettyLoad';
import VideoAutoPlay from '../VideoAutoPlay/VideoAutoPlay';
import Post from '../Post/Post';
import { _fetchPostsChunk, _removeAllPosts } from '../../../_actions/PostsActions';
import st from './index.css';
class PostsList extends Component {
  constructor(props) {
    super(props);
    this.postsListRef = null;
    this.handleOnScrollLoadMediaContent = this.handleOnScrollLoadMediaContent.bind(this);
  }
  componentDidMount() {
    // if (process.env.NODE_ENV === 'development' && this.props.postsList.posts.length === 0) {
    //   const { dispatch, postsList, params } = this.props;
    //   dispatch(_fetchPostsChunk(postsList.page, params ? params.order : ''));
    //   // this.props.fetchRecommendsChunk();
    // }
    const { dispatch, params } = this.props;
    dispatch(_fetchPostsChunk(1, params ? params.order : ''));

    window.addEventListener('scroll', this.handleOnScrollLoadMediaContent, false);

    const width = parseInt(window.getComputedStyle(this.postsListRef, null).getPropertyValue('width').replace('px', ''), 10);
    this.containerWidth = width < 500 ? width : 500;
  }
  componentDidUpdate(prevProps) {
    // console.log(prevProps);
    // console.log(this.props);
    if (prevProps.order !== this.props.order) {
      // console.log(prevProps);
      // console.log(this.props);
      const oldId = prevProps.order;
      const newId = this.props.order;
      if (newId !== oldId) {
        const { dispatch, postsList, order } = this.props;
        dispatch(_removeAllPosts());
        dispatch(_fetchPostsChunk(postsList.page, order));
      // this.props.dispatch(_fetchPost(this.props.params.postId));
      // this.fetchPost();
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleOnScrollLoadMediaContent);
  }

  handleOnScrollLoadMediaContent = () => {
    if (document.body.scrollTop > parseInt(window.getComputedStyle(this.postsListRef, null).getPropertyValue('height').replace('px', ''), 10) - 1000) {
      const { dispatch, postsList, params } = this.props;
      if (!postsList.fetching && !postsList.error && postsList.hasNext) {
        dispatch(_fetchPostsChunk(postsList.page, params));
      }
    }
  };

  render() {
    const { postsList, auth, dispatch } = this.props;
    // console.log(postsList);
    const posts = postsList.posts;
    // console.log(auth);
    // let postsChunks = [];
    // if (postsList) postsChunks = postsList.postsChunks;
    return (
      <div className={st['post-list-wrapper']} ref={(postsListRef) => { this.postsListRef = postsListRef; }}>
        {posts && posts.length > 0 && posts.map((post, i) =>
          <Post post={post} key={i} dispatch={dispatch} auth={auth}>
            {post.type.indexOf('gif') === -1 ?
              <Link to={`/posts/${post._id}`}>
                <ImagePrettyLoad
                  dispatch={dispatch}
                  post={post}
                  key={post._id}
                  image={post.thumb}
                  imageLQ={post.thumbLQ}
                  imageHeight={post.thumbHeight}
                  imageWidth={post.thumbWidth}
                  containerWidth={this.containerWidth}
                />
              </Link>
              :
              <VideoAutoPlay
                key={post._id}
                videoSrc={post.thumb}
                videoHeight={post.thumbHeight}
                videoWidth={post.thumbWidth}
                containerWidth={this.containerWidth}
              />
            }
          </Post>
        )}
      </div>
    );
  }
}
PostsList.propTypes = {
  postsList: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  params: PropTypes.string.string,
};
export default PostsList;
