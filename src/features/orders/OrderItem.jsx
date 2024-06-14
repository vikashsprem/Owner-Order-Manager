import { useState } from "react";
import OrderForm from "./OrderForm";

const OrderItem = ({ order, onDelete }) => {
  
  const [isEditing, setIsEditing] = useState(false);
  
  const handleDelete = () => {
    onDelete(order.id);
  };

  return (
    <tr key={order.id} className="border-b border-gray-200">
      {isEditing ? (
        <td colSpan="7">
          <OrderForm
            initialOrder={order}
            onSubmit={()=> setIsEditing(false)}
            onCancel={()=> setIsEditing(false)}
          />
        </td>
      ) : (
        <>
          <td className="w-1/6 p-2">{order.customer_name}</td>
          <td className="w-1/6 p-2 text-center">{order.customer_email}</td>
          <td className="w-1/6 p-2 text-center">#{order.id.substr(-6)}</td>
          <td className="w-1/6 p-2 text-center">{order.product}</td>
          <td className="w-1/6 p-2 text-center">{order.quantity}</td>
          <td className="w-1/6 p-2 text-center">${order.order_value}</td>
          <td className="w-1/6 p-2 text-end">
            <button onClick={()=> setIsEditing(true)} className="text-blue-600 hover:text-blue-800">
              Edit
            </button>
            <button onClick={handleDelete} className="text-red-600 hover:text-red-800">
              Delete
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

export default OrderItem;
