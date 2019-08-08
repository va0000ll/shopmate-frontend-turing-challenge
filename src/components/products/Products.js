import React, { useState, useEffect } from 'react';
import Item from './Item';
// import FilterItems from './FilterItems';
import axios from 'axios';
import { toast } from 'react-toastify';
import Spinner from '../layout/Spinner';

const Products = ({ filter_by, filter_id }) => {
  let [loading, setLoading] = useState(true);
  let [products, setProducts] = useState([]);

  useEffect(() => {
    setLoading(true);
    (async () => {
      let url =
        !filter_by && !+filter_id
          ? 'products'
          : `products/${filter_by}/${filter_id}`;

      try {
        let res = await axios.get(`${process.env.REACT_APP_API_URI}${url}`);
        setProducts(res.data.rows);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast('Opps! There is Unknown error !!', { type: 'error' });
      }
    })();

    //eslint-disable-next-line
  }, [filter_id]);

  let items = products.map(p => <Item key={p.product_id} product={p} />);

  return (
    <div className="category-products">
      <div className="row">
        {/* <FilterItems /> */}
        {loading ? (
          <div className="card">
            <Spinner />
          </div>
        ) : (
          items
        )}
      </div>
    </div>
  );
};

export default Products;
