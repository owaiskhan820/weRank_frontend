import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { verifyEmailToken } from '../../api/Auth/authService';
import { logout, setCredentials } from '../../redux/auth/authSlice';




const useEmailVerification = () => {
  const { user } = useSelector((state) => state.auth); // Get the user from Redux state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isFirstVerification, setIsFirstVerification] = useState(false); // Local state to track first verification

  useEffect(() => {
    const token = searchParams.get('token');
    if (token && !user?.isVerified) { // Only verify if the user isn't already verified
      verifyUserEmail(token);
    }
  }, [dispatch, navigate, searchParams, user?.isVerified]);

  const verifyUserEmail = async (token) => {
    try {
      const response = await verifyEmailToken(token);
      dispatch(setCredentials({ ...response, isVerified: true })); // Set the isVerified flag to true upon successful verification
      setIsFirstVerification(true); // Update the state to indicate this is the first verification
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Error verifying email:', error);
      dispatch(logout());
      navigate('/login');
    }
  };

  // Return both the isVerified status and whether this is the first verification
  return { isVerified: user?.isVerified, isFirstVerification };
};

export default useEmailVerification;
