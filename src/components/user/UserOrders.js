import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../context/user/userContext';

import OrderItem from './OrderItem';
import Spinner from '../layout/Spinner';

const UserOrders = () => {
  // Bring UserContext
  let { userOrders, loadOrders } = useContext(UserContext);

  let [loading, setLoading] = useState(true);

  useEffect(() => {
    // loading
    (async function() {
      await loadOrders();
      setLoading(false);
    })();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="tab-pane fade show active">
      <h4 className="mb-4 text-center">My Orders</h4>
      {loading ? (
        <Spinner />
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th># Order Name</th>
              <th>Total amount</th>
              <th>Created on</th>
              <th>Shipped on</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {userOrders.length > 0 ? (
              userOrders.map(order => (
                <OrderItem key={order.order_id} order={order} />
              ))
            ) : (
              <tr className="text-center mt-4">
                <td className="text-center" colSpan="5">
                  There is no orders .
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserOrders;
