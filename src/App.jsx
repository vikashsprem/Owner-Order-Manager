import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Orders from './features/orders/Orders';
import TotalOrderValue from './features/totalOrderValue/TotalOrderValue';
import './App.css';

function App() {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="app">
      <Navbar />
      <div className="content">
        {user ? (
          <>
            <TotalOrderValue />
            <Orders />
          </>
        ) : (
          <div className='block text-4xl text-gray-400 mt-20'>
            <p className='text-center mb-5 font-semibold'>Welcome to Order Management</p>
            <p className='text-center mb-5 font-extralight'>Please log in to view all orders and total order value.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
