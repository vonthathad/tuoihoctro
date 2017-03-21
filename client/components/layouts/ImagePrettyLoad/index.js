import React, { Component, PropTypes } from 'react';
import st from './index.css';

class ImagePrettyLoad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadedImg: false,
            loadedImgLQ: false
        }
        this.containerWidth = null;
        this.handleLoadedImg = this.handleLoadedImg.bind(this);
        this.handleLoadedImgLQ = this.handleLoadedImgLQ.bind(this);
    }

    handleLoadedImg = () => {
        this.setState({
            loadedImg: true
        });
    }
    handleLoadedImgLQ = () => {
        this.setState({
            loadedImgLQ: true
        });
    }
    render() {
        const { image, imageLQ, imageWidth, imageHeight } = this.props
        return (
            <div>
                <div className={`${st.placeholder}`} style={{ width: imageWidth, height: this.containerWidth * imageHeight / imageWidth }} ref={(container) => { if (container) this.containerWidth = container.offsetWidth; }}>
                    <div>
                        <img src={imageLQ} className={`${st['img-small']} ${this.state.loadedImgLQ ? `${st.loaded}` : ''}`} onLoad={this.handleLoadedImgLQ} />
                        <img src={image} className={this.state.loadedImg ? `${st.loaded}` : ''} onLoad={this.handleLoadedImg} />
                    </div>
                </div>
            </div>
        );
    }
}

ImagePrettyLoad.propTypes = {

};

export default ImagePrettyLoad;
