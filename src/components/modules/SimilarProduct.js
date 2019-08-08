import React from 'react';
import Item from '../products/Item';
const SimilarProduct = () => {
  return (
    <div className="similar-products my-5">
      <h2 className="font-weight-bold mb-4">You may also like</h2>
      <div className="similar-content text-nowrap">
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    </div>
  );
};

export default SimilarProduct;
