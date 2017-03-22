import React, { Component, PropTypes } from 'react';
import st from './index.css';
class ImagePrettyLoad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedImg: false, loadedImgLQ: false,
    };
    this.containerWidth = null;
    this.handleLoadedImg = this.handleLoadedImg.bind(this);
    this.handleLoadedImgLQ = this.handleLoadedImgLQ.bind(this);
  }
  
  handleLoadedImg = () => {
    this.setState({
      loadedImg: true,
    });
  }
  
  handleLoadedImgLQ = () => {
    this.setState({
      loadedImgLQ: true,
    });
  }
  
  render() {
    const { image, imageLQ, imageWidth, imageHeight, width } = this.props;
    return (
      <div>
        <div
          className={`${st.placeholder}`}
          style={{ width, height: this.containerWidth * imageHeight / imageWidth }}
          ref={(container) => {
            if (container) this.containerWidth = container.offsetWidth;
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
  width: PropTypes.number.isRequired,
};
export default ImagePrettyLoad;
