import React, { Component, PropTypes } from 'react';
import RecommendsChunk from '../RecommendsChunk';
import st from './index.css';

class RecommendsList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { recommendsList } = this.props;
        let recommendsChunks = null;
        if (recommendsList) recommendsChunks = recommendsList.recommendsChunks;
        return (
            <div className={st['recommends-list-wrapper']}>
                <div className={st['right-bar-title']}>
                    <h1>Bài liên quan</h1>
                </div>
                {recommendsChunks && recommendsChunks.length > 0 &&
                    recommendsChunks.map((recommendsChunk, i) =>
                        <RecommendsChunk
                            key={i}
                            recommends={recommendsChunk.recommends}
                            loading={recommendsChunk.loading}
                        />
                    )}
            </div >
        );
    }
}
RecommendsList.propTypes = {
    recommendsList: PropTypes.objectOf(PropTypes.shape({
        recommendsChunks: PropTypes.arrayOf(PropTypes.shape({
            recommendsChunk: PropTypes.arrayOf(PropTypes.shape({
                recommends: PropTypes.array.isRequired,
                loading: PropTypes.bool.isRequired,
            })),
        })),
        error: PropTypes.bool,
        paging: PropTypes.number,
        page: PropTypes.number,
    })),
};

export default RecommendsList