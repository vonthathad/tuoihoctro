import React, { PropTypes } from 'react';

// Import Components
import RecommendListItem from '../RecommendListItem';

import st from './index.css';

function RecommendList(props) {
  return (
    <div className={`col-sm-4 ${st.p80}`}>
      <div className={st['featured-box']}>
        <div className={st['right-bar-title']}>
          <h1>Bài liên quan</h1>
        </div>
        {  props.posts &&
          props.posts.map(post => (
            <ImagePrettyLoad 
              key={post._id} 
              image={post.smallThumb}
              imageLQ={post.smallThumbLQ}
              imageHeight={post.smallThumbHeight}
              imageWidth={post.smallThumbWidth}
            />
          ))
        }
      </div>
    </div>
  );
}

RecommendList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    smallThumb: PropTypes.string.isRequired,
    numComment: PropTypes.number.isRequired,
  })).isRequired,
};

export default RecommendList;
