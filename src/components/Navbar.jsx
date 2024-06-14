import Auth from '../features/auth/Auth';
import '../assets/styles/Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <h1 className='font-semibold'>Order Management</h1>
      <Auth />
    </div>
  );
};

export default Navbar;
