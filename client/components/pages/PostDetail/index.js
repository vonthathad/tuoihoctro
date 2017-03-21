import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// Import Components
import RecommendList from '../../layouts/RecommendList';

// Import Style
import styles from '../../layouts/PostListItem/index.css';

// Import Actions
import { fetchPost } from '../../../actions/PostsActions';

// Import Selectors
import { getPost, getPosts } from '../../../reducers/PostsReducer';

// import FacebookProvider, { Comments, Share } from 'react-facebook';

export function PostDetail(props) {
  // let pathname = window.location.href;
  return (
    <div id={styles.wrap}>
      <div className="container">
        <div className="col-sm-8" id={styles.left}>
          <div className={styles['post-content-box']}>
            <header className={styles['post-header']}>
              <div className={styles['post-title']}><h1>{props.post.title}</h1></div>
              <div className={styles['post-footer']}>
                <span className={styles['display-vote']}>{props.post.point} Điểm</span> - {props.post.view} Lượt xem - 0 Bình luận
              </div>
            </header>
            <div className="vote-box-top">
              <a className="btn btn-default glyphicon glyphicon-arrow-up"><span
                className={`${styles['vote-font']} ${styles['remove-mobile']}`}
              >UP</span>
              </a>
              <a className="btn btn-default glyphicon glyphicon-arrow-down"></a>
            </div>

            <div className={styles['social-box-top']} style={{ position: 'fixed' }}>
              <a className={`btn btn-default ${styles['fb-button-top']}`}>
                <span className="fa fa-facebook"></span>
                <span className={styles['remove-mobile']}> Facebook</span>
              </a>
              <a className={`btn btn-default ${styles['twitter-button-top']}`}>
                <span className={'fa fa-twitter'}></span>
                <span className={styles['remove-mobile']}> Twitter</span>
              </a>
              <a className={`btn btn-danger pull-right ${styles['btn-arrow-right']} ${styles['remove-mobile']}`}>
                Đọc tiếp
              </a>
            </div>

            <div className={styles['post-page-left']}>
              <div id={styles['page-post']} className={styles['post-content']}>
                <a className={styles['popup-image']}>
                  <img alt="" src={props.post.mediaContent} className={styles['img-responsive']} style={{ width: '600' }} />
                </a>
              </div>
              <div className={styles['bottom-share']}>
                <a className={styles['fb-btn-long']}>Share on Facebook</a>
                <a className={styles['twitter-btn-long']}>Share on Twitter</a>
              </div>
              <div className={styles['post-date']}>
                <abbr className={styles.timeago}></abbr> BY
                <a className={styles['user-link']}>{props.post.created.username}</a>
              </div>
            </div>
          </div>
        </div>
        <RecommendList posts={props.posts} />

      </div>
    </div>
  );
}

// Actions required to provide data for this component to render in sever side.
PostDetail.need = [params => {
  // return fetchPost(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    post: getPost(state, props.params.cuid),
    posts: getPosts(state),
  };
}

PostDetail.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    mediaContent: PropTypes.string.isRequired,
    numComment: PropTypes.number.isRequired,
    point: PropTypes.number.isRequired,
    created: PropTypes.string.isRequired,
    view: PropTypes.number.isRequired,
  }).isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    smallThumb: PropTypes.string.isRequired,
  })).isRequired,
};

export default connect(mapStateToProps)(PostDetail);
