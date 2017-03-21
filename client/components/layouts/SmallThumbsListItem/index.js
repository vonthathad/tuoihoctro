import React, { PropTypes } from 'react';
import styles from './index.css';
import { Link } from 'react-router';

function SmallThumbsListItem(props) {
  return (
    <Link to={`posts/${props.smallThumb._id}`}>
      <div className={styles['featured-smallThumb']}>
        <div className={styles['featured-image']}>
          {/*<img src={props.smallThumb.smallThumb} alt="" />*/}
           {props.children}
        </div>
        <div className={styles['featured-title']}>
          <h2>{props.smallThumb.title}</h2>
        </div>
      </div>
    </Link>
  );
}

SmallThumbsListItem.propTypes = {
  smallThumb: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    smallThumb: PropTypes.string.isRequired,
  }).isRequired,
};

export default SmallThumbsListItem;
