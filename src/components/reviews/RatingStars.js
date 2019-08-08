import React, { useState } from 'react';
import goldStar from '../../icons/icons-star-gold.png';
import greyStar from '../../icons/icons-star-grey.png';

const RatingStars = ({ stars, onChange }) => {
  // init stat
  let [rating, setRating] = useState(stars || null);
  let [temp_rating, setTempRating] = useState(null);

  // Events
  let onOver = star => {
    setTempRating(rating);
    setRating(star);
  };
  let onOut = () => {
    setRating(temp_rating);
  };
  let saveRating = star => {
    setTempRating(star);
    setRating(star);
    onChange(star);
  };

  // define items arr and icon string variables
  let items = [];
  let icon = null;

  for (let i = 1; i <= 5; i++) {
    // Selecte the right icon
    icon = rating !== null && rating >= i ? goldStar : greyStar;

    items.push(
      <span key={i}>
        {!!stars ? ( // If there is a stars then it is static no need for events
          <img className="mr-2" src={icon} alt="" />
        ) : (
          <img
            className="mr-2"
            onMouseOver={() => onOver(i)}
            onMouseOut={onOut}
            onClick={() => saveRating(i)}
            src={icon}
            alt=""
          />
        )}
      </span>
    );
  }
  return <div className="review-rating-stars">{items}</div>;
};

export default RatingStars;
