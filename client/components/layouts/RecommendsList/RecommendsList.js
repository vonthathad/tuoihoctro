import React, { Component, PropTypes } from 'react';
import RecommendsChunk from '../RecommendsChunk/RecommendsChunk';
// import { _fetchRecommendsChunk } from '../../../_actions/RecommendsActions';
import st from './index.css';
import ads from '../../../assets/images/ads_300x.png';
class RecommendsList extends Component {
  componentDidMount() {
    // const { dispatch } = this.props;
    // dispatch(_fetchRecommendsChunk(1));
  }
  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
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
        {recommendsChunks && recommendsChunks.length > 0 && this.shuffleArray(recommendsChunks).slice(0, 5).map((recommendsChunk, i) =>
          <div key={i}>
            <RecommendsChunk
              recommends={recommendsChunk.recommends}
              loading={recommendsChunk.loading}
            />
            <div> hello world
              <img src={ads} alt="ads" />
            </div>
          </div>
        )
        }
      </div >
    );
  }
}
RecommendsList.propTypes = {
  recommendsList: PropTypes.object.isRequired, dispatch: PropTypes.func,
};
export default RecommendsList;
