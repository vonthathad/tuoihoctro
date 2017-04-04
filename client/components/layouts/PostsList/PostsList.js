import React, { Component, PropTypes } from 'react';
import PostsChunk from '../PostsChunk/PostsChunk';
import { _fetchPostsChunk } from '../../../_actions/PostsActions';

import st from './index.css';
class PostsList extends Component {
  constructor(props) {
    super(props);
    this.postsListRef = null;
    this.handleOnScrollLoadMediaContent = this.handleOnScrollLoadMediaContent.bind(this);
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleOnScrollLoadMediaContent, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleOnScrollLoadMediaContent);
  }
  handleOnScrollLoadMediaContent = () => {
    if (document.body.scrollTop > parseInt(window.getComputedStyle(this.postsListRef, null).getPropertyValue('height').replace('px', ''), 10) - 1000) {
      const { dispatch, postsList } = this.props;
      if (!postsList.fetching && !postsList.error && postsList.hasNext) {
        dispatch(_fetchPostsChunk(postsList.page));
      }
    }
  };

  render() {
    const { postsList, auth, dispatch } = this.props;
    let postsChunks = [];
    if (postsList) postsChunks = postsList.postsChunks;
    return (
      <div className={st['post-list-wrapper']} ref={(postsListRef) => { this.postsListRef = postsListRef; }}>
        {postsChunks && postsChunks.length > 0 && postsChunks.map((postsChunk, i) => <PostsChunk
          key={i}
          auth={auth}
          posts={postsChunk.posts}
          dispatch={dispatch}
          loading={postsChunk.loading}
        />)}
      </div >
    );
  }
}
PostsList.propTypes = {
  postsList: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};
export default PostsList;
