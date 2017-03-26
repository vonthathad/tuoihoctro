import React, { Component, PropTypes } from 'react';
import PostsChunk from '../PostsChunk/PostsChunk';
import { _fetchPostsChunk } from '../../../_actions/PostsActions';
import st from './index.css';
class PostsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _window: {},
    };
    this.postsListRef = null;
    this.handleOnScrollLoadMediaContent = this.handleOnScrollLoadMediaContent.bind(this);
  }
  componentDidMount() {
    this.setWindowToState();
    window.addEventListener('scroll', this.handleOnScrollLoadMediaContent, false);
    window.addEventListener('resize', this.handleOnScrollLoadMediaContent, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleOnScrollLoadMediaContent);
    window.removeEventListener('resize', this.handleOnScrollLoadMediaContent);
  }
  setWindowToState() {
    this.setState({
      _window: {
        pageXOffset: window.pageXOffset,
        pageYOffset: window.pageYOffset,
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
      },
    });
  }
  handleOnScrollLoadMediaContent = () => {
    this.setWindowToState();
    if (document.body.scrollTop > parseInt(window.getComputedStyle(this.postsListRef, null).getPropertyValue('height').replace('px', ''), 10) - 1000) {
      const { dispatch, postsList } = this.props;
      if (!postsList.fetching && !postsList.error) {
        dispatch(_fetchPostsChunk(postsList.page));
      }
    }
  };

  render() {
    const { postsList } = this.props;
    let postsChunks = [];
    if (postsList) postsChunks = postsList.postsChunks;
    return (
      <div className={st['post-list-wrapper']} ref={(postsListRef) => { this.postsListRef = postsListRef; }}>
        {postsChunks && postsChunks.length > 0 && postsChunks.map((postsChunk, i) => <PostsChunk
          key={i}
          posts={postsChunk.posts}
          loading={postsChunk.loading}
          _window={this.state._window}
        />)}
      </div >
    );
  }
}
PostsList.propTypes = {
  postsList: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};
export default PostsList;
