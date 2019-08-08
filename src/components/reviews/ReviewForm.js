import React, { useState } from 'react';
import RatingStars from './RatingStars';
import { toast } from 'react-toastify';
import axios from 'axios';

const ReviewForm = ({ product_id, addReview }) => {
  let [loading, setLoading] = useState(false);
  let [reviewValues, setReview] = useState({
    name: '',
    review: '',
    rating: 0
  });

  let { name, review, rating } = reviewValues;

  let onChange = e =>
    setReview({ ...reviewValues, [e.target.name]: e.target.value });

  let onSubmit = async e => {
    e.preventDefault();
    console.log(reviewValues);

    if (!name || !review || !rating) {
      toast('Please fill all inputs market with *', { type: 'error' });
      return false;
    }

    setLoading(true);

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URI}products/${product_id}/reviews`,
        {
          ...reviewValues,
          product_id
        }
      );
      setReview({ name: '', review: '', rating: 0 });
      setLoading(false);
      toast('Review has been added successfully', { type: 'success' });
      addReview();
    } catch (error) {
      setLoading(false);
      toast('Opps! There is an accourd error !! Please try again', {
        type: 'error'
      });
    }
  };

  let onRatingChange = r => setReview({ ...reviewValues, rating: r });

  return (
    <div className="review-form">
      <h2 className="my-5">Add a review</h2>
      <form onSubmit={onSubmit}>
        <div className="row form-group">
          <div className="col-md-3 font-weight-bold">Choose a nickname *</div>
          <div className="col-lg-4">
            <input
              type="text"
              className="form-control form-control-lg"
              name="name"
              value={name}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="row form-group">
          <div className="col-md-3 font-weight-bold">Your Review *</div>
          <div className="col-md-9">
            <textarea
              className="form-control form-control-lg"
              rows="4"
              value={review}
              onChange={onChange}
              name="review"
            />
            <small className="form-text text-muted">
              Your review must be at least 30 characters{' '}
              <a href="/">Full review guidelines</a>
            </small>
          </div>
        </div>
        <div className="row form-group mb-5">
          <div className="col-md-3 font-weight-bold">Overall rating *</div>
          <div className="col-md-9">
            <RatingStars onChange={onRatingChange} />
          </div>
        </div>
        <div className="row">
          <div className="col-9 offset-md-3">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
