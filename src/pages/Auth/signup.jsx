// src/pages/Signup/Signup.js
import React from 'react';
import AuthForm from '../../components/Auth/AuthForm';
import { ThemeProvider } from '@mui/material/styles';
import { Grid } from '@mui/material';
import theme from '../../utils/theme'; 
import {signup} from '../../api/Auth/authService'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LoadingModal from '../../shared/LoadingModal/LoadingModal';

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignupSubmit = async (formData) => {
    try {
      setIsLoading(true); // Show the loading modal
      const data = await signup(formData);
      if (data) {
        alert("Signed up successfully!");
        navigate('/'); 

      }
    } catch (error) {
      alert("Signup failed:", error.message);
    }
    finally {
      setIsLoading(false); // Hide the loading modal
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container justifyContent="center" style={{ minHeight: '100vh' }}>
        <Grid item xs={12} sm={8} md={5} lg={4} xl={3}>
          <AuthForm mode="signup" onFormSubmit={handleSignupSubmit} />
          {isLoading && <LoadingModal />}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Signup;
