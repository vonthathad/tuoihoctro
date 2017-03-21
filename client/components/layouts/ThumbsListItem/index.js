import React, { PropTypes } from 'react';
import { Link } from 'react-router';
// Import Style
import styles from './index.css';
// import icons from '../../../../../assets/css/icon.css';

function ThumbListItem(props) {
  // console.log(props);
  return (
    <div className={styles['thumb-box']}>
      <header className={styles['thumb-header']}>
        <div className={styles['thumb-title']}>
          <h1>
            <Link to={`thumbs/${props.thumb._id}`} >
              {props.thumb.title}
            </Link>
          </h1>
        </div>
        <div className={styles['thumb-footer']}>{props.thumb.view} lượt xem - 1 bình luận</div>
      </header>
      <div className={styles['thumb-left']}>

        <div className={styles.thumb}>
          {/*<img className={styles['img-responsive']} alt={props.thumb.title} src={props.thumb.thumb} />*/}
          {props.children}
        </div>

        <div className={styles['vote-box']}>
          <a className="btn btn-default glyphicon glyphicon-heart-empty"></a>
          <a className="btn btn-default glyphicon glyphicon-thumbs-down"></a>
          <span className={styles['display-vote']}>{props.thumb.point} điểm</span>
        </div>

        <div className={styles['social-box']}>
          <a className="btn btn-default twitter-button">
            <span className="fa fa-twitter" ></span>
            <span className={styles['remove-mobile']} > Twitter</span>
          </a>
          <a className="btn btn-default fb-button">
            <span className="fa fa-facebook"  ></span>
            <span className={styles['remove-mobile']} > Facebook</span>
          </a>
        </div>
      </div>

    </div>
  );
}

ThumbListItem.propTypes = {
  thumb: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    thumb: PropTypes.string.isRequired,
    point: PropTypes.number.isRequired,
    view: PropTypes.number.isRequired,
  }).isRequired,
};

export default ThumbListItem;
