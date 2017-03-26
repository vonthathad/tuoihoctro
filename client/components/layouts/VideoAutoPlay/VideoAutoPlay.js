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
    const { y } = this.videoRef;
    const { videoWidth, videoHeight, containerWidth } = this.props;
    const changedVideoHeight = videoHeight * containerWidth / videoWidth;
    if (y < - changedVideoHeight / 2 && y + _window.innerHeight > changedVideoHeight) {
      this.playVideo();
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
    const changedVideoHeight = Math.round(videoHeight * containerWidth / videoWidth);
    return (
      <div
        className={`${st['video-wrapper']}`}
        onClick={this.onVideoClick}
      >
        <video
          className={`${st['video-media-content']}`}
          width={containerWidth}
          height={changedVideoHeight}
          ref={videoTag => {
            videoTag &&
              (this.videoRef = {
                y: - videoTag.getBoundingClientRect().top,
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
          style={{ top: !isNaN(changedVideoHeight) ? 0 - changedVideoHeight / 2 : 0 }}
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
  containerWidth: PropTypes.number,
  videoSrc: PropTypes.string.isRequired,
};

export default VideoAutoPlay;
