import { useState, useEffect } from 'react';
import '../../assets/styles/OrderForm.css';
import { useDispatch } from 'react-redux';
import { addOrder, updateOrder } from './ordersSlice';

const OrderForm = ({ initialOrder, onSubmit, onCancel }) => {

  const [newOrder, setOrder] = useState(initialOrder);
  const dispatch = useDispatch();

  useEffect(() => {
    setOrder(initialOrder);
  }, [initialOrder]);

  const productPrices = {
    'Product 1': 29,
    'Product 2': 49,
    'Product 3': 149,
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setOrder({ ...newOrder, [name]: value });
  };

  const handleSubmit = () => {
    const orderValue = productPrices[newOrder.product] * newOrder.quantity;
    if (newOrder.id) {
      newOrder.order_value = orderValue;
      dispatch(updateOrder(newOrder));
      alert('Order updated successfully');
    } 
    else {
      const orderId = Math.random().toString(36).substring(2, 9);
      dispatch(addOrder({ ...newOrder, id: orderId, order_value: orderValue }));
      alert('Order added successfully');
    }
    onSubmit();
  };


  return (
    <div className="order-form-overlay">
      <div className="order-form-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="customer_name"
            value={newOrder.customer_name}
            onChange={handleChange}
            placeholder="Customer Name"
            required
          />
          <input
            type="email"
            name="customer_email"
            value={newOrder.customer_email}
            onChange={handleChange}
            placeholder="Customer Email"
            required
          />
          <select
            name="product"
            value={newOrder.product}
            onChange={handleChange}
          >
            <option value="Product 1">Product 1</option>
            <option value="Product 2">Product 2</option>
            <option value="Product 3">Product 3</option>
          </select>
          <input
            type="number"
            name="quantity"
            value={newOrder.quantity}
            onChange={handleChange}
            min="1"
            required
          />
          <div >
            <span>Order Value: </span>
            <span>${productPrices[newOrder.product] * newOrder.quantity}</span>
          </div>
          <div className='flex justify-between'>
            <button type="button" onClick={onCancel}>Cancel</button>
            <button type="submit">Save Order</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
