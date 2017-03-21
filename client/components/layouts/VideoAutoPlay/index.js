import React, { Component } from 'react';
import './index.css';
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
    componentWillReceiveProps(nextProps) {
        const { x, w, y, h, video } = this.videoRef;
        const { win } = nextProps
        const r = x + w;
        const b = y + h;
        const visibleX = Math.max(0, Math.min(w, win.pageXOffset + win.innerWidth - x, r - win.pageXOffset));
        const visibleY = Math.max(0, Math.min(h, win.pageYOffset + win.innerHeight - y, b - window.pageYOffset));
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
        const { post, win } = this.props
        return (
            <div className='video-wrapper'
                onClick={this.onVideoClick}
            >
                <video className='video-media-content'
                    width={post.mediaContentWidth}
                    height={post.mediaContentHeight}
                    ref={video => {
                        video &&
                            (this.videoRef = {
                                x: video.offsetLeft,
                                y: video.offsetTop,
                                w: video.offsetWidth,
                                h: video.offsetHeight,
                                video: video
                            });
                    }}
                    loop>
                    <source src={post.mediaContent} type="video/mp4" />
                </video>
                <div className="badge-gif-wrapper"
                    ref={badge => { badge && (this.badge = badge) }}
                    style={{ top: 0 - post.mediaContentHeight / 2 }}>
                    <span className="badge-gif">GIF</span>
                </div>
            </div>
        );
    }
}

VideoAutoPlay.propTypes = {

};

export default VideoAutoPlay;