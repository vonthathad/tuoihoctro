import React, { PropTypes } from 'react';

const TwitterHeart = ({ id, checked }) => {
  return (
        <div>
            <input className="toggle-heart" id={id} type="checkbox" />
            <label className="label" htmlFor={id} aria-label="like">❤</label>
        </div>
    );
};
