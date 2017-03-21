import React, { Component, PropTypes } from 'react';
import ImagePrettyLoad from '../ImagePrettyLoad'
import VideoAutoPlay from '../VideoAutoPlay'
import ThumbsListItem from '../ThumbsListItem'
import './index.css'
class PostsList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { thumbs, loading } = this.props;
        // console.log(thumbs);
        return (
            <div>
                {loading &&
                    < h2 > Loading...</h2>
                }
                {!loading && thumbs && thumbs.length > 0 &&
                    thumbs.map(thumb => (
                        <ThumbsListItem thumb={thumb}>
                            {thumb.type.indexOf('gif') === -1
                                ? <ImagePrettyLoad 
                                key={thumb._id} 
                                image={thumb.thumb}
                                imageLQ={thumb.thumbLQ}
                                imageHeight={thumb.thumbHeight}
                                imageWidth={thumb.thumbWidth}
                                 />
                                : <VideoAutoPlay 
                                key={thumb._id} 
                                videoSrc={thumb.thumb}
                                videoHeight={thumb.thumbHeight}
                                videoWidth={thumb.thumbWidth}
                                _window={this.props._window} 
                                />
                            }
                        </ThumbsListItem>
                    )

                    )
                }
            </div >
        );
    }
}

PostsList.propTypes = {
    thumbs: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
};

export default PostsList;