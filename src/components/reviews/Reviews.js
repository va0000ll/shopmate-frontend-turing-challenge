import React, { useState, useEffect } from 'react';
import Review from './Review';
import ReviewForm from './ReviewForm';
import Spinner from '../layout/Spinner';
import axios from 'axios';
import { toast } from 'react-toastify';

const Reviews = ({ product_id }) => {
  let [loading, setLoading] = useState(true);
  let [reviews, setReviews] = useState({});

  useEffect(() => {
    addReview();
    //eslint-disable-next-line
  }, []);

  let addReview = async () => {
    setLoading(true);
    try {
      let res = await axios.get(
        `${process.env.REACT_APP_API_URI}products/${product_id}/reviews`
      );

      setReviews(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast('Opps! There is an accourd error !!', { type: 'error' });
    }
  };

  return (
    <div className="product-reviews p-5">
      <h2>Product reviews</h2>
      <div className="reviews-list my-3">
        {loading ? (
          <Spinner />
        ) : (
          reviews.map((review, index) => (
            <Review key={index + review.created_on} review={review} />
          ))
        )}
      </div>
      <ReviewForm addReview={addReview} product_id={product_id} />
    </div>
  );
};

export default Reviews;
