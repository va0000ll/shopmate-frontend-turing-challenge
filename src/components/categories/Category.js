import React, { useState, useEffect } from 'react';
// import CategoryHeader from '../modules/CategoryHeader';
import Products from '../products/Products';
import Categories from './Categories';

const Category = ({ match }) => {
  let [filter, setFilter] = useState({ id: 0, page: null });
  let { id, page } = match.params;

  useEffect(() => {
    if (+id && (page === 'category' || page === 'department')) {
      setFilter({
        id,
        page: page === 'category' ? 'inCategory' : 'inDepartment'
      });
    } else {
      setFilter({ id: 0, page: null });
    }

    // eslint-disable-next-line
  }, [id]);

  return (
    <div className="container-fluid my-3">
      {/* <CategoryHeader category="Mens" /> */}
      <div className="row">
        <div className="col-md-3">
          <Categories department_id={page === 'department' && +id ? id : 0} />
        </div>
        <div className="col-md-9">
          <Products filter_by={filter.page} filter_id={filter.id} />
        </div>
      </div>
    </div>
  );
};

export default Category;
