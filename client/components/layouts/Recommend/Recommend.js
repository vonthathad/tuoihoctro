import React, { PropTypes } from 'react';
import styles from './index.css';
import { Link } from 'react-router';

const Recommend = (props) => {
  return (
    <Link to={`posts/${props.recommend._id}`}>
      <div className={styles['featured-recommend']}>
        <div className={styles['featured-image']}>
          {/* <img src={props.recommend.recommend} alt="" />*/}
           {props.children}
        </div>
        <div className={styles['featured-title']}>
          <h2>{props.recommend.title}</h2>
        </div>
      </div>
    </Link>
  );
};

Recommend.propTypes = {
  recommend: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default Recommend;
