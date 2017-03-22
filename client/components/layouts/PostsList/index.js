import React, { Component, PropTypes } from 'react';
import PostsChunk from '../PostsChunk';
import { _fetchPostsChunk } from '../../../_actions/PostsActions';
import st from './index.css'

class PostsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _window: {},
            
        }
        this.postsListRef = null
        this.handleOnScrollLoadMediaContent = this.handleOnScrollLoadMediaContent.bind(this)
    }
    handleOnScrollLoadMediaContent = () => {
        this.setState({
            _window: {
                pageXOffset: window.pageXOffset,
                pageYOffset: window.pageYOffset,
                innerWidth: window.innerWidth,
                innerHeight: window.innerHeight,
            }
        });

        if (document.body.scrollTop >  parseInt(window.getComputedStyle(this.postsListRef,null).getPropertyValue("height").replace('px','')) - 1000 ) {
            console.log(1234);
            const { dispatch, postsList } = this.props;
            const postsChunks = postsList.postsChunks;
            // if is not loading thumbschunk or there has not been an error 
            if (!postsList.fetching && !postsChunks[postsChunks.length - 1].loading && !postsList.error) {
                dispatch(_fetchPostsChunk('thumb', postsList.paging, postsList.page));
            }
        }
    }

    componentDidMount() {
        this.setState({
            _window: {
                pageXOffset: window.pageXOffset,
                pageYOffset: window.pageYOffset,
                innerWidth: window.innerWidth,
                innerHeight: window.innerHeight,
            }
        });
        window.addEventListener('scroll', this.handleOnScrollLoadMediaContent, false)
        window.addEventListener('resize', this.handleOnScrollLoadMediaContent, false)
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleOnScrollLoadMediaContent)
        window.removeEventListener('resize', this.handleOnScrollLoadMediaContent)
    }
    render() {
        const { postsList } = this.props;
        // console.log(this.props);
        // console.log("this.props" + JSON.stringify(this.props));
        // console.log("postsList" + JSON.stringify(postsList));
        let postsChunks = null;
        if (postsList) postsChunks = postsList.postsChunks;
        return (
            <div className={st['post-list-wrapper']} ref={(postsListRef)=>this.postsListRef = postsListRef}>
                {postsChunks && postsChunks.length > 0 &&
                    postsChunks.map((postsChunk, i) =>
                        <PostsChunk
                            key={i}
                            posts={postsChunk.posts}
                            loading={postsChunk.loading}
                            _window={this.state._window}
                        />
                    )}
            </div >
        );
    }
}
PostsList.propTypes = {
    postsList: PropTypes.objectOf(PropTypes.shape({
        postsChunks: PropTypes.arrayOf(PropTypes.shape({
            postsChunk: PropTypes.arrayOf(PropTypes.shape({
                posts: PropTypes.array.isRequired,
                loading: PropTypes.bool.isRequired,
            })),
        })),
        error: PropTypes.bool,
        paging: PropTypes.number,
        page: PropTypes.number,
    })),
};

export default PostsList