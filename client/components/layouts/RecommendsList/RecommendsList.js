import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
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

  shuffleArray = (array, numEle, notInclude) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    // if (notInclude) {
    //   for (let i = array.length - 1; i > 0; i--) {
    //     if (array[i]._id === notInclude) {
    //       array.splice(i, 1);
    //       console.log(array[i]);
    //       console.log(array[i]._id);
    //       console.log(notInclude);
    //       break;
    //     }
    //   }
    // }
    return array.slice(0, numEle);
  }

  render() {
    let {posts} = this.props.recommendsList;
    const {dispatch, numComments, notInclude} = this.props;

    // console.log(numComments);
    // let recommendsChunks = null;
    // if (recommendsList) recommendsChunks = this.shuffleArray(recommendsList.recommendsChunks).slice(0, 5);
    // console.log(posts);
    posts = this.shuffleArray(posts, numComments, notInclude);
    const type = this.props.type;
    return (
      <div className={st['featured-box']}>
        <div className={st['right-bar-title']}>
          <h1>Có thể bạn sẽ thích</h1>
        </div>
        <div className={`${st.recommentContainer}`}>
          {
            posts.length > 0 &&
            posts.map(post => (
              <div className={`${st['recommend-item']} ${type === 'horizontal' ? `${st.horizontal} col-sm-2` : ''}`}
                   key={post._id}>
                <Recommend post={post} type={type} dispatch={dispatch}>
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
        </div>
        {/*<img src={ads} alt="" />*/}
      </div >
    );
  }
}
RecommendsList.propTypes = {
  recommendsList: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  numComments: PropTypes.number,
  notInclude: PropTypes.number,
  type: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
  // console.log(ownProps);
  return {
    recommendsList: state.recommendsStore.recommendsList,
    numComments: ownProps.numComments,
  };
};
export default connect(mapStateToProps)(RecommendsList);
