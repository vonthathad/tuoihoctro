import React, {Component, PropTypes } from 'react';
import ImagePrettyLoad from '../ImagePrettyLoad'
// Import Components
import SmallThumbsListItem from '../SmallThumbsListItem';


/*function SmallThumbsList(props) {
  return (
    <div>
      {props.smallThumbs &&
        props.smallThumbs.map(smallThumb => (
          <ImagePrettyLoad
            key={smallThumb._id}
            image={smallThumb.smallThumb}
            imageLQ={smallThumb.smallThumbLQ}
            imageHeight={smallThumb.smallThumbHeight}
            imageWidth={smallThumb.smallThumbWidth}
          />
        ))
      }
    </div>
  );
}

SmallThumbsList.propTypes = {
  smallThumbs: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    smallThumb: PropTypes.string.isRequired,
    numComment: PropTypes.number.isRequired,
  })).isRequired,
};

export default SmallThumbsList;*/


class SmallThumbsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { smallThumbs, loading } = this.props;
    return (
      <div>
        {loading &&
          < h2 > Loading...</h2>
        }
        {!loading && smallThumbs && smallThumbs.length > 0 &&
          smallThumbs.map(smallThumb => (
            <SmallThumbsListItem smallThumb={smallThumb}>
              <ImagePrettyLoad
                key={smallThumb._id}
                image={smallThumb.smallThumb}
                imageLQ={smallThumb.smallThumbLQ}
                imageHeight={smallThumb.smallThumbHeight}
                imageWidth={smallThumb.smallThumbWidth}
              />
            </SmallThumbsListItem>
          ))
        }
      </div >
    );
  }
}

SmallThumbsList.propTypes = {
  smallThumbs: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    smallThumb: PropTypes.string.isRequired,
    numComment: PropTypes.number.isRequired,
  })).isRequired,
};
export default SmallThumbsList;