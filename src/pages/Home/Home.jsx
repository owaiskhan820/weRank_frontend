import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { verifyEmailToken } from '../../api/Auth/authService';
import { logout } from '../../redux/auth/authSlice'; // Import actions
import { setCredentials } from '../../redux/auth/authSlice';
import LoadingModal from '../../shared/LoadingModal/LoadingModal'
import Alert from '@mui/material/Alert';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const auth = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false); // State to manage loading

  useEffect(() => {
    const verifyUserEmail = async () => {
      const token = searchParams.get('token');
      if (token) {
        setIsLoading(true); // Enable loading state
        try {
          const response = await verifyEmailToken(token);
          dispatch(setCredentials({ user: response.user, token: auth.token }));
          navigate('/', { replace: true });
        } catch (error) {
          console.error('Error verifying email:', error);
          dispatch(logout());
          navigate('/login');
        } finally {
          setIsLoading(false); // Disable loading state
        }
      }
    };
  
    verifyUserEmail();
  }, [dispatch, navigate, searchParams, auth.token]);

  

  // Render method that checks the isVerified flag
  // and shows a message if the user is not verified
  return (
    <div>
      {isLoading && <LoadingModal />} 
      {auth.user && auth.user.isVerified ? (
        <Alert severity="info">Hi {auth.user.username}, you are verified.</Alert>
      ) : (
        <Alert severity="success">Hi, {auth.user ? auth.user.username : 'Guest'}, you are not verified yet. Consider Verifying your Email before continuing</Alert>
      )}
      {/* Rest of your homepage content */}
    </div>
  );
};

export default Home;
