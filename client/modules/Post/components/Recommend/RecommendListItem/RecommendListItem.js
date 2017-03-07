import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './RecommendListItem.css';
import thump from '../../../../../assets/img/thump.jpg'

function RecommendListItem(props) {
  return (
        <div className={styles['single-recommend']}>

          <img src={thump} alt=""/>
          <p>
            {props.post.title}
          </p>

        </div>
  );
}

RecommendListItem.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default RecommendListItem;
