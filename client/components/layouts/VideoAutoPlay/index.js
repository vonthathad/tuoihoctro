import React, { Component } from 'react';
import st from './index.css';
class VideoAutoPlay extends Component {
    constructor(props) {
        super(props);
        this.onVideoClick = this.onVideoClick.bind(this);
        this.pauseVideo = this.pauseVideo.bind(this);
        this.playVideo = this.playVideo.bind(this);
    }
    onVideoClick = () => {
        if (this.isPlay) {
            this.pauseVideo();
        } else {
            this.playVideo()
        }
    }
    componentDidMount(){
       this.checkDomPosition(this.props._window);
    }
    componentWillReceiveProps(nextProps) {
        this.checkDomPosition(nextProps._window);
    }
    checkDomPosition(_window){
        const { x, w, y, h, video } = this.videoRef;
        const r = x + w;
        const b = y + h;
        const visibleX = Math.max(0, Math.min(w, _window.pageXOffset + _window.innerWidth - x, r - _window.pageXOffset));
        const visibleY = Math.max(0, Math.min(h, _window.pageYOffset + _window.innerHeight - y, b - _window.pageYOffset));
        const visible = visibleX * visibleY / (w * h);
        const fraction = 0.99;
        if (visible > fraction) {
            this.playVideo();
        } else {
            this.pauseVideo();
        }
    }
    playVideo = () => {
        this.videoRef.video.play();
        this.isPlay = true;
        this.badge.style.display = 'none';
    }
    pauseVideo = () => {
        this.videoRef.video.pause();
        this.isPlay = false;
        this.badge.style.display = 'block';
    }
    render() {
        const { videoWidth,videoHeight,videoSrc  } = this.props
        // console.log(videoSrc);  
        return (
            <div className={`${st['video-wrapper']}`}
                onClick={this.onVideoClick}
            >
                <video className={`${st['video-media-content']}`}
                    width={videoWidth}
                    height={videoHeight}
                    ref={videoTag => {
                        videoTag &&
                            (this.videoRef = {
                                x: videoTag.offsetLeft,
                                y: videoTag.offsetTop,
                                w: videoTag.offsetWidth,
                                h: videoTag.offsetHeight,
                                video: videoTag
                            });
                    }}
                    loop>
                    <source src={videoSrc} type="video/mp4" />
                </video>
                <div className={`${st['badge-gif-wrapper']}`}
                    ref={badge => { badge && (this.badge = badge) }}
                    style={{ top: 0 - videoHeight / 2 }}>
                    <span className={`${st['badge-gif']}`}>GIF</span>
                </div>
            </div>
        );
    }
}

VideoAutoPlay.propTypes = {

};

export default VideoAutoPlay;