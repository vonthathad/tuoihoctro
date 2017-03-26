import React, { PropTypes } from 'react';
import ImagePrettyLoad from '../ImagePrettyLoad/ImagePrettyLoad';
// Import Components
import Recommend from '../Recommend/Recommend';
import st from './index.css';
const RecommendsChunk = ({ recommends, loading }) => (
  <div>
    {loading &&
      < h2 > Loading...</h2>
    }
    {!loading && recommends && recommends.length > 0 &&
      recommends.map(recommend => (
        <div className={st['recommend-item']} key={recommend._id}>
          <Recommend recommend={recommend}>
            <ImagePrettyLoad
              image={recommend.smallThumb}
              imageLQ={recommend.smallThumbLQ}
              imageHeight={recommend.smallThumbHeight}
              imageWidth={recommend.smallThumbWidth}
            />
          </Recommend>
        </div>
      ))
    }
  </div >
);

RecommendsChunk.propTypes = {
  recommends: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};
export default RecommendsChunk;
