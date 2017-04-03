import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
// Import Components
// import RecommendList from '../../layouts/RecommendsListContainer/RecommendsListContainer';
import RecommendsListContainer from '../../containers/RecommendsListContainer';
import Helmet from 'react-helmet';

// Import Style
import styles from './PostDetail.css';

// Import Actions
import { _fetchPost, voteUpPost, voteDownPost, deletePostRequest } from '../../../_actions/PostsActions';

// Import Selectors
import TwitterHeart from '../../decorations/TwitterHeart/TwitterHeart';

// import { getPost, getPosts } from '../../../_reducers/PostsReducer';

import FacebookProvider, { Comments, Share } from 'react-facebook';

export class PostDetail extends Component {

  componentWillMount() {
    this.props.dispatch(_fetchPost(this.props.params.cuid));
  }

  deletePostByOwner(id) {
    this.props.dispatch(deletePostRequest(id));
  }
  voteUp(id) {
    this.props.dispatch(voteUpPost(id));
  }
  voteDown(id) {
    this.props.dispatch(voteDownPost(id));
  }
  readBack(id) {
    this.props.dispatch(_fetchPost(id - 1));
  }
  readNext(id) {
    console.log(id);
    browserHistory.go(`/posts/${id + 1}`);
  }
  render() {
    console.log(this.props);
    const post = this.props.post.title;
    return (
      <div id={styles.wrap}>
        <Helmet title={this.props.post.title}
          meta={[
            {
              name: 'viewport',
              content: 'width=device-width, initial-scale=1',
            },
            {
              name: 'keywords',
              content: 'tuoihoctro, tuổi học trò, gif, image, vui',
            },
            {
              name: 'title',
              content: `${this.props.post.title}`,
            },
            {
              name: 'description',
              content: `${this.props.post.title}`,
            },
            {
              name: 'og:description',
              content: `${this.props.post.title}`,
            },
            {
              name: 'og:image',
              content: `${this.props.post.mediaContent}`,
            },
            {
              name: 'og:url',
              content: `http://tuoihoctro.co/posts/${this.props.post._id}`,
            },
          ]}
        />
        <div className="container">
          <div className="col-sm-8" id={styles.left}>
            {
              (this.props.post)
                ? <div className={styles['post-content-box']}>
                  <header className={styles['post-header']}>
                    <div className={styles['post-title']}><h1>{this.props.post.title}</h1></div>

                  </header>
                  <div className={styles['post-action']}>
                    <span>{this.props.post.point}</span>
                    <div onClick={this.voteUp.bind(this, this.props.post._id)} >
                      <TwitterHeart _id={this.props.post._id} checked={false} />
                    </div>
                    <span>{this.props.post.view}</span><i className="fa fa-eye" aria-hidden="true"></i>
                    <div className={styles['social-box-top']}>
                      <a className={`btn btn-default ${styles['fb-button-top']}`} >
                        <FacebookProvider appID="1559166841054175">
                          <Share>
                            <span className={styles['remove-mobile']}>Chia sẻ</span>
                          </Share>
                        </FacebookProvider>
                      </a>
                      <a className={`btn btn-danger pull-right ${styles['btn-arrow-right']} ${styles['remove-mobile']}`} onClick={this.readNext.bind(this, this.props.post._id)}>
                        Đọc tiếp
                      </a>
                    </div>
                  </div>
                  <div className={styles['post-page-left']}>
                    <div id={styles['page-post']} className={styles['post-content']}>
                        <img alt="" src={this.props.post.mediaContent} className={styles['img-responsive']} />
                    </div>
                    {
                      (this.props.auth && this.props.post.creator && this.props.auth._id == this.props.post.creator._id)
                        ? <div className={styles['bottom-share']} >
                          <a href="" onClick={this.deletePostByOwner.bind(this, this.props.post._id)}>
                            Delete this post
                          </a>
                        </div>
                        : null
                    }
                     <div className={styles.timeago}>
                       BY
                       {
                         (this.props.post.creator)
                           ? <a className={styles['user-link']}> {this.props.post.creator.username}</a>
                           : null
                       }
                    </div>
                  </div>
                  <FacebookProvider appID="1559166841054175">
                    <Comments />
                  </FacebookProvider>
                </div>
                : <div className={styles.loading}>Loading&#8230;</div>
            }
          </div>
        </div>
      </div >
    );
  }

}

// Actions required to provide data for this component to render in sever side.
PostDetail.need = [params => {
  return _fetchPost(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    post: state.postsStore.postDetail,
    auth: state.auth,
  };
}

PostDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.object,
  data: PropTypes.object,
  // post: PropTypes.shape({
  //   _id: PropTypes.number.isRequired,
  //   title: PropTypes.string.isRequired,
  //   mediaContent: PropTypes.string,
  //   numComment: PropTypes.number.isRequired,
  //   point: PropTypes.number.isRequired,
  //   created: PropTypes.string.isRequired,
  //   view: PropTypes.number.isRequired,
  //   creator: PropTypes.object.isRequired,
  // }).isRequired,
};

export default connect(mapStateToProps)(PostDetail);
