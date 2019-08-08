import React from 'react';
import heartIcon from '../../icons/icons-heart-red.png';
import commentsIcon from '../../icons/icons-comments-black.png';
import ReviewStars from './RatingStars';

const Review = ({ review }) => {
  return (
    <div className="review py-4">
      <div className="row">
        <div className="col-md-4">
          <ReviewStars stars={review.rating} />
          <div className="reviewer-name font-weight-bold mt-3">
            {review.name}
          </div>
          <div className="review-time text-muted">{review.created_on}</div>
        </div>
        <div className="col-md-8">
          <p className="comment-text">{review.review}</p>
          <div className="review-btns">
            <span className="mr-4">
              <button className="btn btn-light">
                <img src={heartIcon} alt="" />
              </button>{' '}
              113
            </span>
            <span>
              <button className="btn btn-light">
                <img src={commentsIcon} alt="" />
              </button>{' '}
              113
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
