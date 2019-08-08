import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Categories = ({ department_id }) => {
  let [cates, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      let url = department_id
        ? `categories/inDepartment/${department_id}`
        : 'categories';

      try {
        let res = await axios.get(`${process.env.REACT_APP_API_URI}${url}`);

        setCategories(department_id ? res.data : res.data.rows);
      } catch (error) {
        let message = error.message;
        if (error.response) {
          message = error.response.data.error.message;
        }
        toast(message, { type: 'error' });
      }
    })();
    //eslint-disable-next-line
  }, [department_id]);

  return (
    <div className="categories p-3">
      <h3>Categories</h3>
      <div className="nav flex-column nav-pills">
        {cates.map(item => (
          <Link
            key={item.category_id}
            to={`/category/${item.category_id}`}
            className="nav-link btn btn-link text-left"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
