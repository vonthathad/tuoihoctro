import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

// Import Components
import RecommendList from '../../components/Recommend/RecommendList';

// Import Style
import styles from '../../components/Post/PostListItem/PostListItem.css';

// Import Actions
import { fetchPost } from '../../PostActions';

// Import Selectors
import { getPost, getPosts } from '../../PostReducer';

// Import Image
import thump from '../../../../assets/img/thump.jpg';

import FacebookProvider, { Comments, Share } from 'react-facebook';

export function PostDetailPage(props) {
  let pathname = window.location.href;
  return (
    <div className="row">
      <div className="col-md-8">
        <Helmet title={props.post.title} />
        <div className={`${styles['single-post']} ${styles['post-detail']} row`}>
          <h3 className={styles['post-title']}>{props.post.title}</h3>
          <p className={styles['author-name']}><FormattedMessage id="by" /> {props.post.name}</p>
          <p className={styles['author-name']}>3 Điểm  -  24 Lượt xem  -  1 Bình luận</p>
          <img src={thump} alt="" />
          <FacebookProvider appID="1559166841054175">
            <Share href={pathname}>
              <div className={styles['social-buttons']}>
                <a href="#" className={`btn ${styles['btn-fb']}`}> Chia sẻ  Facebook</a>
              </div>
            </Share>
          </FacebookProvider>
        </div>
        <FacebookProvider appID="1559166841054175">
          <Comments href={pathname} />
        </FacebookProvider>
      </div>
      <RecommendList posts={props.posts} />
    </div>
  );
}

// Actions required to provide data for this component to render in sever side.
PostDetailPage.need = [params => {
  return fetchPost(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    post: getPost(state, props.params.cuid),
    posts: getPosts(state),
  };
}

PostDetailPage.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
};

export default connect(mapStateToProps)(PostDetailPage);
