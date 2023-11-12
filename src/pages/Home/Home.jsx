import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { verifyEmailToken } from '../../api/Auth/authService';
import { setCredentials, logout } from '../../redux/auth/authSlice'; // Import actions

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const verifyUserEmail = async () => {
      const token = searchParams.get('verificationToken');
      if (token) {
        try {
          const response = await verifyEmailToken(token);
          dispatch(setCredentials({ user: response.user, token: auth.token }));
          navigate('/', { replace: true });
        } catch (error) {
          console.error('Error verifying email:', error);
          dispatch(logout());
          navigate('/login');
        }
      }
    };
  
    verifyUserEmail();
  }, [dispatch, navigate, searchParams]);

  // Render method that checks the isVerified flag
  // and shows a message if the user is not verified
  return (
    <div>
      {auth.user && auth.user.isVerified ? (
        <p>Hi {auth.user.username}, you are verified.</p>
      ) : (
        <p>Hi, you are not verified yet. Consider Varifing your Email before continuing</p>
      )}
      {/* Rest of your homepage content */}
    </div>
  );
};

export default Home;
