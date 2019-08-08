import React from 'react';

const OrderItem = ({ order }) => {
  return (
    <tr>
      <td>
        #{order.order_id} - {order.name}
      </td>
      <td>{order.total_amount}</td>
      <td>{order.created_on}</td>
      <td>{order.shipped_on}</td>
      <td>{order.status}</td>
    </tr>
  );
};

export default OrderItem;
