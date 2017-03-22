import React, {Component, PropTypes } from 'react';
import ImagePrettyLoad from '../ImagePrettyLoad'
// Import Components
import Recommend from '../Recommend';

class RecommendsChunk extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { recommends, loading } = this.props;
    //  console.log("this.props" + JSON.stringify(this.props));
    return (
      <div>
        {loading &&
          < h2 > Loading...</h2>
        }
        {!loading && recommends && recommends.length > 0 &&
          recommends.map(recommend => (
            <Recommend recommend={recommend}>
              <ImagePrettyLoad
                key={recommend._id}
                image={recommend.smallThumb}
                imageLQ={recommend.smallThumbLQ}
                imageHeight={recommend.smallThumbHeight}
                imageWidth={recommend.smallThumbWidth}
              />
            </Recommend>
          ))
        }
      </div >
    );
  }
}

RecommendsChunk.propTypes = {
    recommends: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
};
export default RecommendsChunk;