import React, { Fragment, useState } from 'react';

const ProductImages = ({ images }) => {
  images = Array.isArray(images) ? images : [];
  let [current, setCurrent] = useState(images.length > 0 ? images[0] : null);

  return (
    <div className="imgs-view">
      {images.length > 0 ? (
        <Fragment>
          <div className="current-img">
            <img
              src={`https://backendapi.turing.com/images/products/${current}`}
              alt=""
              className="product-img"
            />
          </div>
          <div className="imgs-view-list">
            {images.map(img => (
              <img
                src={`https://backendapi.turing.com/images/products/${img}`}
                key={img}
                alt=""
                className={img === current ? 'selected-img' : ''}
                onClick={() => setCurrent(img)}
              />
            ))}
          </div>
        </Fragment>
      ) : (
        <div className="text-center">There is no images</div>
      )}
    </div>
  );
};

export default ProductImages;
