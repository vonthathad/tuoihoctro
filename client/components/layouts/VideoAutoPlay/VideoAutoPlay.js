import React, { PropTypes, Component } from 'react';
import st from './index.css';
class VideoAutoPlay extends Component {
  constructor(props) {
    super(props);
    this.onVideoClick = this.onVideoClick.bind(this);
    this.pauseVideo = this.pauseVideo.bind(this);
    this.playVideo = this.playVideo.bind(this);
    this.state = {
      videoRef: {},
      videoRefSetten: false,
    };
    this.checkDomPosition = this.checkDomPosition.bind(this);
  }
  componentDidMount() {
    window.addEventListener('scroll', this.checkDomPosition, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.checkDomPosition);
  }
  onVideoClick = () => {
    if (this.isPlay) {
      this.pauseVideo();
    } else {
      this.playVideo();
    }
  };
  checkDomPosition() {
    const { videoRef, videoRefSetten } = this.state;
    if (videoRefSetten) {
      const { videoWidth, videoHeight, containerWidth } = this.props;
      const changedVideoHeight = videoHeight * containerWidth / videoWidth;
      const y = videoRef.getBoundingClientRect().top;
      if (y > 0 && y + changedVideoHeight < window.innerHeight) {
        this.playVideo();
      } else {
        this.pauseVideo();
      }
    }
  }
  playVideo = () => {
    this.state.videoRef.play();
    this.isPlay = true;
    this.badge.style.display = 'none';
  };
  pauseVideo = () => {
    this.state.videoRef.pause();
    this.isPlay = false;
    this.badge.style.display = 'block';
  };
  render() {
    const { videoSrc, containerWidth } = this.props;
    return (
      <div
        className={`${st['video-wrapper']}`}
        onClick={this.onVideoClick}
      >
        <video
          className={`${st['video-media-content']}`}
          width={containerWidth}
          ref={videoRef => {
            videoRef && !this.state.videoRefSetten &&
              this.setState({
                videoRef,
                videoRefSetten: true,
              });
          }}
          preload="yes"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div
          className={`${st['badge-gif-wrapper']}`}
          ref={badge => { badge && (this.badge = badge); }}
        >
          <span className={`${st['badge-gif']}`}>GIF</span>
        </div>
      </div >
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
