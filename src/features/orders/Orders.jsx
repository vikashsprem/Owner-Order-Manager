import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOrders, deleteOrder } from './ordersSlice';
import OrderItem from './OrderItem';
import Pagination from './Pagination';
import '../../assets/styles/Orders.css';
import OrderForm from './OrderForm';


const Orders = () => {

  const initialOrderState = {
    customer_name: '',
    customer_email: '',
    product: 'Product 1',
    quantity: 1,
  };
  const dispatch = useDispatch();
  const orders = useSelector(state => state.orders.orders);

  const [isFormVisible, setFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState(orders);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate indexes for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch('/DummyDataNew.json');
      const data = await response.json();
      dispatch(setOrders(data));
    };

    fetchOrders();
  }, [dispatch]);


  useEffect(() => {
    const filterItems = orders.filter(order => {
      const searchTermLower = searchTerm.toLowerCase();
      return (
        (order.customer_name && order.customer_name.toLowerCase().includes(searchTermLower)) ||
        (order.customer_email && order.customer_email.toLowerCase().includes(searchTermLower)) ||
        (order.id && order.id.toLowerCase().includes(searchTermLower)) ||
        (order.product && order.product.toLowerCase().includes(searchTermLower)) ||
        (order.quantity && order.quantity.toString().includes(searchTermLower)) ||
        (order.order_value && order.order_value.toString().includes(searchTermLower))
      );
    });
    setFilteredOrders(filterItems);
  }, [searchTerm, orders]);

  const handleDeleteOrder = (orderId) => {
    dispatch(deleteOrder(orderId));
    alert('Order deleted successfully');
  };
  

  return (
    <>
      <div className="text-center">
        <input
          type="text"
          placeholder="Search Orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700"
        />
      </div>
    
      <div className="orders">
        
        <div className='flex justify-between'>
          <h2 className='text-xl'>Orders</h2>
          <button
            className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-5 rounded"
            onClick={() => setFormVisible(true)}
          >
            Add Order
          </button>
        </div>

        {isFormVisible && <OrderForm initialOrder={initialOrderState} onSubmit={()=> setFormVisible(false)} onCancel={() => setFormVisible(false)}/>}

        <p className='text-sm text-gray-500 mb-1'>Showing {currentItems.length} of {filteredOrders.length} orders</p>
        
        <table className="table-fixed w-full">
          <thead>
            <tr className="bg-black text-white">
              <th className="w-1/6 p-2 text-start">Customer Name</th>
              <th className="w-1/6 p-2">Customer Email</th>
              <th className="w-1/6 p-2">Order ID</th>
              <th className="w-1/6 p-2">Product</th>
              <th className="w-1/6 p-2">Quantity</th>
              <th className="w-1/6 p-2">Order Value</th>
              <th className="w-1/6 p-2 text-end">Revise / Actions</th>
            </tr>
          </thead>
          
          <tbody>
            {currentItems.map((order) => (
              <OrderItem
                key={order.id}
                order={order}
                onDelete={handleDeleteOrder}
              />
            ))}
          </tbody>
        </table>

        <Pagination
          totalItems={orders.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />

      </div>
    </>
  );
};

export default Orders;
