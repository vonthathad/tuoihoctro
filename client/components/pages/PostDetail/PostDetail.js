import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Components
// import RecommendList from '../../layouts/RecommendList';
// import RecommendsListContainer from '../../containers/RecommendsListContainer';

// Import Style
import styles from './PostDetail.css';

// Import Actions
import { _fetchPost, voteUpPost, voteDownPost } from '../../../_actions/PostsActions';

// Import Selectors
// import { getPost, getPosts } from '../../../_reducers/PostsReducer';

// import FacebookProvider, { Comments, Share } from 'react-facebook';

export class PostDetail extends Component {
  // let pathname = window.location.href;

  constructor() {
    super();
    this.state = {
      post: {},
    };
  }

  componentWillMount() {
    this.props.dispatch(_fetchPost(this.props.params.cuid));
  }

  voteUp(id) {
    this.props.dispatch(voteUpPost(id));
  }
  voteDown(id) {
    this.props.dispatch(voteDownPost(id));
  }
  render() {
    const { post } = this.props.data;
    return (
      <div id={styles.wrap}>
        <div className="container">
          <div className="col-sm-8" id={styles.left}>
            {
              (post)
              ?
                <div className={styles['post-content-box']}>
                  <header className={styles['post-header']}>
                    <div className={styles['post-title']}><h1>{post.title}</h1></div>
                    <div className={styles['post-footer']}>
                      <span className={styles['display-vote']}>{post.point} Điểm</span> - {post.view} Lượt xem - 0 Bình luận
                    </div>
                  </header>
                  <div className={styles['vote-box-top']}>
                    <a className="btn btn-default glyphicon glyphicon-arrow-up" onClick={this.voteUp.bind(this, post._id)}><span
                      className={`${styles['vote-font']} ${styles['remove-mobile']}`}
                    >UP</span>
                    </a>
                    <a className="btn btn-default glyphicon glyphicon-arrow-down" onClick={this.voteDown.bind(this, post._id)}></a>
                  </div>
                  <div className={styles['social-box-top']}>
                    <a className={`btn btn-default ${styles['fb-button-top']}`}>
                      <span className="fa fa-facebook"></span>
                      <span className={styles['remove-mobile']}> Facebook</span>
                    </a>
                    <a className={`btn btn-danger pull-right ${styles['btn-arrow-right']} ${styles['remove-mobile']}`}>
                      Đọc tiếp
                    </a>
                  </div>
                  <div className={styles['post-page-left']}>
                    <div id={styles['page-post']} className={styles['post-content']}>
                      <a_fetchPost className={styles['popup-image']}>
                        <img alt="" src={post.mediaContent} className={styles['img-responsive']} style={{ width: '600' }} />
                      </a_fetchPost>
                    </div>
                    <div className={styles['bottom-share']}>
                      <a className={styles['fb-btn-long']}>Share on Facebook</a>
                    </div>
                    <div className={styles['post-date']}>
                      <abbr className={styles.timeago}></abbr> BY
                      <a className={styles['user-link']}>{post.creator.username}</a>
                    </div>
                  </div>
                </div>
              :
                <div>Chua co du lieu</div>
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
  console.log(state);
  return {
    post: state.postsStore.postDetail,
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
