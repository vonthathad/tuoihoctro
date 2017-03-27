import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Components
// import RecommendList from '../../layouts/RecommendList';
// import RecommendsListContainer from '../../containers/RecommendsListContainer';

// Import Style
import styles from './PostDetail.css';

// Import Actions
import { _fetchPost, voteUpPost, voteDownPost, deletePostRequest } from '../../../_actions/PostsActions';

// Import Selectors
// import { getPost, getPosts } from '../../../_reducers/PostsReducer';

import FacebookProvider, { Comments, Share } from 'react-facebook';

export class PostDetail extends Component {

  componentWillMount() {
    this.props.dispatch(_fetchPost(this.props.params.cuid));
  }

  deletePostByOwner(id){
    this.props.dispatch(deletePostRequest(id))
  }
  voteUp(id) {
    this.props.dispatch(voteUpPost(id));
  }
  voteDown(id) {
    this.props.dispatch(voteDownPost(id));
  }
  readBack(id){
    this.props.dispatch(_fetchPost(id-1))
  }
  readNext(id){
    this.props.dispatch(_fetchPost(id+1))
  }
  render(){
    console.log(this.props);
    return (
      <div id={styles.wrap}>
        <div className="container">
          <div className="col-sm-8" id={styles.left}>
            {
              (this.props.post)
              ?  <div className={styles['post-content-box']}>
                  <header className={styles['post-header']}>
                    <div className={styles['post-title']}><h1>{this.props.post.title}</h1></div>
                    <div className={styles['post-footer']}>
                      <span className={styles['display-vote']}>{this.props.post.point} Điểm</span> - {this.props.post.view} Lượt xem - 0 Bình luận
                    </div>
                  </header>
                  <div className={styles['vote-box-top']}>
                    <a className="btn btn-default glyphicon glyphicon-arrow-up" onClick={this.voteUp.bind(this, this.props.post._id)}><span
                      className={`${styles['vote-font']} ${styles['remove-mobile']}`}
                    >UP</span>
                    </a>
                    <a className="btn btn-default glyphicon glyphicon-arrow-down" onClick={this.voteDown.bind(this, this.props.post._id)}></a>
                  </div>
                  <div className={styles['social-box-top']}>
                    <a className={`btn btn-default ${styles['fb-button-top']}`} onClick={this.readBack.bind(this, this.props.post._id)}>
                      <span className={styles['remove-mobile']}> Bài trước</span>
                    </a>
                    <a className={`btn btn-danger pull-right ${styles['btn-arrow-right']} ${styles['remove-mobile']}`} onClick={this.readNext.bind(this, this.props.post._id)}>
                      Đọc tiếp
                    </a>
                  </div>
                  <div className={styles['post-page-left']}>
                    <div id={styles['page-post']} className={styles['post-content']}>
                      <a_fetchPost className={styles['popup-image']}>
                        <img alt="" src={this.props.post.mediaContent} className={styles['img-responsive']} width = {600} />
                      </a_fetchPost>
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
                    <div className={styles['post-date']}>
                      <abbr className={styles.timeago}></abbr> BY
                      {
                        (this.props.post.creator)
                        ? <a className={styles['user-link']}> {this.props.post.creator.username}</a>
                          : null
                      }
                    </div>
                  </div>

                </div>
                : <div className={styles.loading}>Loading&#8230;</div>
            }
          </div>

        </div>
      </div>
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
