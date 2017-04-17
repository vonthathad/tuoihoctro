import React, { PropTypes } from 'react';
import './index.css';
const TwitterHeart = ({ _id, checked, handleClick }) => {
  return (
    <div>
        <input className="toggle-heart" id={_id} type="checkbox" checked={checked} onClick={handleClick} />
        <label className="label" htmlFor={_id} aria-label="like">
          <i className="fa fa-heart" aria-hidden="true"></i>
        </label>
      </div>
    );
};
TwitterHeart.propTypes = {
  _id: PropTypes.number.isRequired,
  checked: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};
export default TwitterHeart;
