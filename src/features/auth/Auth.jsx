import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser } from './authSlice';
import { GoogleLogin } from '@react-oauth/google';
import '../../assets/styles/Auth.css';
import { jwtDecode } from "jwt-decode";

const Auth = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const handleLoginSuccess = (response) => {
    const decodedToken = jwtDecode(response.credential);
    const name = decodedToken.name;
    const email = decodedToken.email;
    if (name && email) {
      dispatch(setUser({ name, email }));
    } else {
      console.error('Failed to extract user information from token');
    }
  };

  const handleLoginFailure = (error) => {
    console.error('Login failed:', error);
  };

  const handleLogoutSuccess = () => {
    dispatch(clearUser());
  };

  return (
    <div className="auth">
      {user ? (
        <div className='flex w-full justify-between items-center'>
          <p>Welcome, {user.name}</p>
          <button onClick={handleLogoutSuccess}>Logout</button>
        </div>
      ) : (
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onFailure={handleLoginFailure}
          render={(renderProps) => (
            <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
              Login with Google
            </button>
          )}
        />
      )}
    </div>
  );
};

export default Auth;

