import React, { Component, PropTypes } from 'react';
import { _fetchPostClient } from '../../../_actions/PostsActions';
import st from './index.css';
class ImagePrettyLoad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedImg: false, loadedImgLQ: false,
    };
    this.containerWidthx = null;
    this.handleLoadedImg = this.handleLoadedImg.bind(this);
    this.handleLoadedImgLQ = this.handleLoadedImgLQ.bind(this);
    this.handleGoDetailPost = this.handleGoDetailPost.bind(this);
  }
  handleLoadedImg = () => {
    this.setState({
      loadedImg: true,
    });
  };
  handleLoadedImgLQ = () => {
    this.setState({
      loadedImgLQ: true,
    });
  };
  handleGoDetailPost() {
    // console.log(1235);
    // console.log(this.props.post);
    this.props.dispatch && this.props.dispatch(_fetchPostClient(this.props.post));
  }
  render() {
    const { image, imageLQ, imageWidth, imageHeight, containerWidth } = this.props;
    return (
      <div onClick={this.handleGoDetailPost}>
        <div
          className={`${st.placeholder} `}
          style={{ containerWidth, height: this.containerWidthx * imageHeight / imageWidth }}
          ref={(container) => {
            if (container) this.containerWidthx = container.offsetWidth;
          }}
        >
          <div>
            <img
              src={imageLQ}
              className={`${st['img-small']}
              ${this.state.loadedImgLQ ? `${st.loaded}` : ''}`}
              onLoad={this.handleLoadedImgLQ}
              alt=""
            />
            <img
              src={image}
              className={this.state.loadedImg ? `${st.loaded}` : ''}
              onLoad={this.handleLoadedImg}
              alt=""
            />
          </div>
        </div>
      </div>
    );
  }
}
ImagePrettyLoad.propTypes = {
  image: PropTypes.string.isRequired,
  imageLQ: PropTypes.string.isRequired,
  imageWidth: PropTypes.number.isRequired,
  imageHeight: PropTypes.number.isRequired,
  containerWidth: PropTypes.number,
  dispatch: PropTypes.func,
  post: PropTypes.object,
};
export default ImagePrettyLoad;
