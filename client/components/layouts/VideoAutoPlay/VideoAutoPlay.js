import React, { PropTypes, Component } from 'react';
import st from './index.css';
class VideoAutoPlay extends Component {
  constructor(props) {
    super(props);
    this.onVideoClick = this.onVideoClick.bind(this);
    this.pauseVideo = this.pauseVideo.bind(this);
    this.playVideo = this.playVideo.bind(this);
  }
  componentDidMount() {
    this.checkDomPosition(this.props._window);
  }
  componentWillReceiveProps(nextProps) {
    this.checkDomPosition(nextProps._window);
  }
  onVideoClick = () => {
    if (this.isPlay) {
      this.pauseVideo();
    } else {
      this.playVideo();
    }
  };
  checkDomPosition(_window) {
    const { y, h } = this.videoRef;
    if (_window.pageYOffset < y && _window.pageYOffset + _window.innerHeight > y + h + h / 3) {
      setTimeout(() => {
        this.playVideo();
      }, 300);
    } else {
      this.pauseVideo();
    }
  }
  playVideo = () => {
    this.videoRef.video.play();
    this.isPlay = true;
    this.badge.style.display = 'none';
  };
  pauseVideo = () => {
    this.videoRef.video.pause();
    this.isPlay = false;
    this.badge.style.display = 'block';
  };
  render() {
    const { videoWidth, videoHeight, videoSrc, containerWidth } = this.props;
    return (
      <div
        className={`${st['video-wrapper']}`}
        onClick={this.onVideoClick}
      >
        <video
          className={`${st['video-media-content']}`}
          width={containerWidth}
          height={videoHeight * containerWidth / videoWidth}
          ref={videoTag => {
            videoTag &&
              (this.videoRef = {
                y: videoTag.offsetTop,
                h: videoTag.offsetHeight,
                video: videoTag,
              });
          }}
          loop
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div
          className={`${st['badge-gif-wrapper']}`}
          ref={badge => { badge && (this.badge = badge); }}
          style={{ top: 0 - videoHeight / 2 }}
        >
          <span className={`${st['badge-gif']}`}>GIF</span>
        </div>
      </div>
    );
  }
}

VideoAutoPlay.propTypes = {
  _window: PropTypes.object.isRequired,
  videoHeight: PropTypes.number.isRequired,
  videoWidth: PropTypes.number.isRequired,
  containerWidth: PropTypes.number.isRequired,
  videoSrc: PropTypes.string.isRequired,
};

export default VideoAutoPlay;
