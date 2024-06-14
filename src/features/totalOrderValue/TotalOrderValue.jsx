import { useSelector } from 'react-redux';
import '../../assets/styles/TotalOrderValue.css';

const TotalOrderValue = () => {
  const orders = useSelector(state => state.orders.orders);

  const totalValue = orders.reduce((sum, order) => {
    const productPrices = {
      'Product 1': 29,
      'Product 2': 49,
      'Product 3': 149,
    };
    return sum + productPrices[order.product] * order.quantity;
  }, 0);

  return (
    <div className="total-order-value">
      Total Order Value: ${totalValue}
    </div>
  );
};

export default TotalOrderValue;
