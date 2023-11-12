// src/pages/Login/Login.js
import React from 'react';
import AuthForm from '../../components/Auth/AuthForm';
import { ThemeProvider } from '@mui/material/styles';
import { Grid } from '@mui/material';
import theme from '../../utils/theme'; 
import {login} from '../../api/Auth/authService'
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import LoadingModal from '../../shared/LoadingModal/LoadingModal';
import { useState } from 'react';
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginSubmit = async (formData, mode) => {
    try {
      setIsLoading(true); // Show the loading modal

      const { user, token } = await login(formData);
      
      if (user) {
        dispatch(setCredentials({ user, token }));
        navigate('/'); 
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed:", error.message);
    }
    finally {
      setIsLoading(false); // Hide the loading modal
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid container justifyContent="center" style={{ minHeight: '100vh' }}>
        <Grid item xs={12} sm={8} md={5} lg={4} xl={3}>
          <AuthForm mode="login" onFormSubmit={handleLoginSubmit} />
          {isLoading && <LoadingModal />}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
