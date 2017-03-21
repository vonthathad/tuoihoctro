import React, { Component, PropTypes } from 'react';
import SmallThumbsList from '../SmallThumbsList';
import { _fetchThumbsChunk } from '../../../_actions/ThumbsActions';
import st from './index.css';

class SmallThumbsListsChunk extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     _window: {},
        //     fetching: false
        // }
        // this.handleOnScrollLoadMediaContent = this.handleOnScrollLoadMediaContent.bind(this)
    }
    // handleOnScrollLoadMediaContent = () => {
    //     this.setState({
    //         _window: {
    //             pageXOffset: window.pageXOffset,
    //             pageYOffset: window.pageYOffset,
    //             innerWidth: window.innerWidth,
    //             innerHeight: window.innerHeight,
    //         }
    //     });
    //     if (document.body.scrollTop + window.innerHeight > document.body.clientHeight || document.documentElement.scrollTop + window.innerHeight > document.body.clientHeight) {
    //         const { dispatch, smallThumbsLists } = this.props;
    //         const smallThumbsChunks = smallThumbsLists.smallThumbsChunks;
    //         // if is not loading smallThumbschunk or there has not been an error 
    //         if (!this.state.fetching && !smallThumbsChunks[smallThumbsChunks.length - 1].loading && !smallThumbsLists.error) {
    //             this.setState({ fetching: true });
    //             dispatch(_fetchThumbsChunk('mediaContent', smallThumbsLists.paging, smallThumbsLists.page));
    //         }
    //     }
    // }

    render() {
        const { smallThumbsLists } = this.props;
        // console.log("smallThumbsLists" + JSON.stringify(smallThumbsLists));
        let smallThumbsChunks = null;
        if (smallThumbsLists) smallThumbsChunks = smallThumbsLists.smallThumbsChunks;
        return (
            <div className={`col-sm-4 ${st.p80}`}>
                <div className={st['featured-box']}>
                    <div className={st['right-bar-title']}>
                        <h1>Bài liên quan</h1>
                    </div>
                    {smallThumbsChunks && smallThumbsChunks.length > 0 &&
                        smallThumbsChunks.map((smallThumbsChunk, i) =>
                            <SmallThumbsList
                                key={i}
                                smallThumbs={smallThumbsChunk.smallThumbs}
                                loading={smallThumbsChunk.loading}
                            />
                        )}
                </div >
            </div>
        );
    }
}
SmallThumbsListsChunk.propTypes = {
    smallThumbsChunks: PropTypes.arrayOf(PropTypes.shape({
        smallThumbs: PropTypes.array.isRequired,
        loading: PropTypes.bool.isRequired,
    })),
};

export default SmallThumbsListsChunk