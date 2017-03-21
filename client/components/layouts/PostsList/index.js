import React, { Component, PropTypes } from 'react';
import ImagePrettyLoad from '../ImagePrettyLoad'
import VideoAutoPlay from '../VideoAutoPlay'
import PostsListItem from '../PostsListItem'
import './index.css'
class PostsList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { posts, loading } = this.props;
        // console.log(posts);
        return (
            <div>
                {loading &&
                    < h2 > Loading...</h2>
                }
                {!loading && posts && posts.length > 0 &&
                    posts.map(post => (
                        <PostsListItem post={post}>
                            {post.type.indexOf('gif') === -1
                                ? <ImagePrettyLoad 
                                key={post._id} 
                                image={post.mediaContent}
                                imageLQ={post.mediaContentLQ}
                                imageHeight={post.mediaContentHeight}
                                imageWidth={post.mediaContentWidth}
                                 />
                                : <VideoAutoPlay key={post._id} post={post} _window={this.props._window} />
                            }
                        </PostsListItem>
                    )

                    )
                }
            </div >
        );
    }
}

PostsList.propTypes = {
    posts: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
};

export default PostsList;