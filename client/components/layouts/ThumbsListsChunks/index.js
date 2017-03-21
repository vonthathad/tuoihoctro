import React, { Component, PropTypes } from 'react';
import ThumbsList from '../ThumbsList';
import { _fetchThumbsChunk } from '../../../_actions/ThumbsActions';


class ThumbsListsChunk extends Component {
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
            const { dispatch, thumbsLists } = this.props;
            const thumbsChunks = thumbsLists.thumbsChunks;
            // if is not loading thumbschunk or there has not been an error 
            if (!this.state.fetching && !thumbsChunks[thumbsChunks.length - 1].loading && !thumbsLists.error) {
                this.setState({ fetching: true });
                dispatch(_fetchThumbsChunk('mediaContent', thumbsLists.paging, thumbsLists.page));
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
        const { thumbsLists } = this.props;
        let thumbsChunks = null;
        if (thumbsLists) thumbsChunks = thumbsLists.thumbsChunks;
        return (
            <div className="col-sm-8">
                {thumbsChunks && thumbsChunks.length > 0 &&
                    thumbsChunks.map((thumbsChunk, i) =>
                        <ThumbsList
                            key={i}
                            thumbs={thumbsChunk.thumbs}
                            loading={thumbsChunk.loading}
                            _window={this.state._window}
                        />
                    )}
            </div >
        );
    }
}
ThumbsListsChunk.propTypes = {
    thumbsChunks: PropTypes.arrayOf(PropTypes.shape({
        thumbs: PropTypes.array.isRequired,
        loading: PropTypes.bool.isRequired,
    })),
};

export default ThumbsListsChunk