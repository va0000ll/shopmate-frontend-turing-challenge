import React, { useState, Fragment, useEffect, useContext } from 'react';
import Color from '../products/Color';
import Size from '../products/Size';
import Quantity from '../products/Quantity';
import Reviews from '../reviews/Reviews';
import ReviewStars from '../reviews/RatingStars';
import ProductImages from '../products/ProductImages';
import heart from '../../icons/icons-heart-red.png';
import SimilarProduct from '../modules/SimilarProduct';
import Spinner from '../layout/Spinner';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import CartContext from '../../context/cart/cartContext';

const ViewProduct = props => {
  // use cart context
  let { addItem, cart_id, ...cartContext } = useContext(CartContext);

  // Init state
  let [addingToCart, setAddingToCart] = useState(false);
  let [loading, setLoading] = useState(true);
  let [product, setProduct] = useState({});
  let [itemAttr, setItemAttr] = useState({
    colors: [],
    sizes: []
  });
  let [attributes, setAttributes] = useState({
    quantity: 1,
    color: null,
    size: null
  });

  let { quantity, color, size } = attributes;
  let { colors, sizes } = itemAttr;

  useEffect(() => {
    let product_id = props.match.params.id;
    (async () => {
      try {
        let res = await axios.get(
          `${process.env.REACT_APP_API_URI}products/${product_id}`
        );

        setProduct(res.data);
        setLoading(false);

        let attrRes = await axios.get(
          `${process.env.REACT_APP_API_URI}attributes/inProduct/${product_id}`
        );

        attrRes.data.map(attr => {
          if (attr.attribute_name.toLowerCase() === 'color') {
            colors.push(attr.attribute_value);
          } else {
            sizes.push(attr.attribute_value);
          }
        });
        setItemAttr({ colors, sizes });
      } catch (error) {
        setLoading(false);
        toast('Opps! There is an accourd error !!', { type: 'error' });
      }
    })();
    //eslint-disable-next-line
  }, []);

  // Add item to cart
  let addToCart = async () => {
    if (!size) {
      toast('Please selecte size', { type: 'error' });
      return;
    }
    if (!color) {
      toast('Please choose color', { type: 'error' });
      return;
    }
    if (!quantity) {
      toast('Quantity cant be 0', { type: 'error' });
      return;
    }

    let item = {
      product_id: product.product_id,
      cart_id: cart_id,
      attributes: `${size}, ${color}`,
      quantity
    };
    setAddingToCart(true);
    await addItem(item);
    setAddingToCart(false);
    setAttributes({
      quantity: 1,
      color: null,
      size: null
    });
  };

  // Handle attributes changes
  let onAttributeChange = (name, value) =>
    setAttributes({ ...attributes, [name]: value });

  return (
    <div className="container my-4">
      <div className="category-products view-products">
        <div className="card p-0">
          {loading ? (
            <Spinner />
          ) : (
            <Fragment>
              <div className="view-product-content">
                <div className="row">
                  <div className="col-md-6 offset-6">
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                          <Link to="/">Home</Link>
                        </li>
                        <li className="breadcrumb-item">
                          <Link to="/">All Categories</Link>
                        </li>
                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          {product.name}
                        </li>
                      </ol>
                    </nav>
                  </div>
                  <div className="col-md-6 text-center">
                    <ProductImages images={[product.image, product.image_2]} />
                  </div>
                  <div className="col-md-6 pt-4">
                    <div className="my-3">
                      <ReviewStars stars={3} />
                    </div>
                    <div className="product-info">
                      <h1>{product.name}</h1>
                      <p>£{product.price}</p>
                    </div>
                    <div className="filter-items">
                      <div className="filter-content bg-white py-3">
                        <Color
                          colors={colors}
                          value={color}
                          onChange={onAttributeChange}
                        />
                        <Size
                          sizes={sizes}
                          value={size}
                          onChange={onAttributeChange}
                        />

                        <Quantity
                          showTitle={true}
                          value={quantity}
                          onChange={onAttributeChange}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <button
                          disabled={cartContext.loading || addingToCart}
                          onClick={addToCart}
                          className="w-100 btn btn-primary btn-lg"
                        >
                          Add to cart
                        </button>
                      </div>
                      <div className="col-sm-6">
                        <button className="btn btn-light btn-lg bg-transparent border-0 text-muted shadow-none py-3">
                          <img src={heart} alt="" /> Add to Witsh List
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Reviews product_id={product.product_id} />
            </Fragment>
          )}
        </div>

        {/* <SimilarProduct /> */}
      </div>
    </div>
  );
};

export default ViewProduct;
