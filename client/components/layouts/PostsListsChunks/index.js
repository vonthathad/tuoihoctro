import React, { Component, PropTypes } from 'react';
import PostsList from '../PostsList';
import { _fetchPostsChunk } from '../../../actions/PostsActions';


class PostsListsChunk extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _window: {},
            fetching: false
        }
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
        if (document.body.scrollTop + window.innerHeight > document.body.clientHeight || document.documentElement.scrollTop + window.innerHeight > document.body.clientHeight) {
            const { dispatch, postsLists } = this.props;
            const postsChunks = postsLists.postsChunks;
            // if is not loading postschunk or there has not been an error 
            if (!this.state.fetching && !postsChunks[postsChunks.length - 1].loading && !postsLists.error) {
                this.setState({ fetching: true });
                dispatch(_fetchPostsChunk('mediaContent', postsLists.paging, postsLists.page));
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
        const { postsLists } = this.props;
        let postsChunks = null;
        if (postsLists) postsChunks = postsLists.postsChunks;
        return (
            <div className="col-sm-8">
                {postsChunks && postsChunks.length > 0 &&
                    postsChunks.map((postsChunk, i) =>
                        <PostsList
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
PostsListsChunk.propTypes = {
    postsChunks: PropTypes.arrayOf(PropTypes.shape({
        posts: PropTypes.array.isRequired,
        loading: PropTypes.bool.isRequired,
    })),
};

export default PostsListsChunk