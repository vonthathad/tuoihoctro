import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import RecommendsChunk from '../RecommendsChunk/RecommendsChunk';
import ImagePrettyLoad from '../ImagePrettyLoad/ImagePrettyLoad';
import Recommend from '../Recommend/Recommend';
// import { _fetchRecommendsChunk } from '../../../_actions/RecommendsActions';
import st from './index.css';
import ads from '../../../assets/images/ads_300x.png';
class RecommendsList extends Component {
  constructor(props) {
    super(props);
    this.shuffleArray = this.shuffleArray.bind(this);
  }
  componentDidMount() {
    // const { dispatch } = this.props;
    // dispatch(_fetchRecommendsChunk(1));
  }
  shuffleArray = (array, numEle) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array.slice(0, numEle);
  }
  render() {
    let { posts } = this.props.recommendsList;
    const { dispatch, numComments } = this.props;

    // console.log(numComments);
    // let recommendsChunks = null;
    // if (recommendsList) recommendsChunks = this.shuffleArray(recommendsList.recommendsChunks).slice(0, 5);
    // console.log(posts);
    posts = this.shuffleArray(posts, numComments);
    return (
      <div className={st['recommends-list-wrapper']}>
        <div className={st['right-bar-title']}>
          <h1>Bài liên quan</h1>
        </div>
        {
          posts.length > 0 &&
          posts.map(post => (
            <div className={st['recommend-item']} key={post._id}>
              <Recommend post={post} dispatch={dispatch}>
                <ImagePrettyLoad
                  image={post.smallThumb}
                  imageLQ={post.smallThumbLQ}
                  imageHeight={post.smallThumbHeight}
                  imageWidth={post.smallThumbWidth}
                />
              </Recommend>
            </div>
          ))
        }
        <img src={ads} alt="" />
      </div >
    );
  }
}
RecommendsList.propTypes = {
  recommendsList: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  numComments: PropTypes.number,
};

const mapStateToProps = (state, ownProps) => {
  // console.log(ownProps);
  return {
    recommendsList: state.recommendsStore.recommendsList,
    numComments: ownProps.numComments,
  };
};
export default connect(mapStateToProps)(RecommendsList);
