import React, { Component, PropTypes } from 'react';
import ImagePrettyLoad from '../ImagePrettyLoad'
import VideoAutoPlay from '../VideoAutoPlay'
import Post from '../Post'
import './index.css'
class PostsChunk extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { posts, loading } = this.props;
        // console.log(this.props);
        return (
            <div>
                {loading &&
                    < h2 > Loading...</h2>
                }
                {!loading && posts && posts.length > 0 &&
                    posts.map(post => (
                        <Post post={post}>
                            {post.type.indexOf('gif') === -1
                                ? <ImagePrettyLoad
                                    key={post._id}
                                    image={post.thumb}
                                    imageLQ={post.thumbLQ}
                                    imageHeight={post.thumbHeight}
                                    imageWidth={post.thumbWidth}
                                    width={500}
                                />
                                : <VideoAutoPlay
                                    key={post._id}
                                    videoSrc={post.thumb}
                                    videoHeight={post.thumbHeight}
                                    videoWidth={post.thumbWidth}
                                    _window={this.props._window}
                                />
                            }
                        </Post>
                    )

                    )
                }
            </div >
        );
    }
}

PostsChunk.propTypes = {
    posts: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default PostsChunk;