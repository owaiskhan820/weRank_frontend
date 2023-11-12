// src/components/Auth/AuthForm.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Paper, Grid, Box, Link } from '@mui/material';
import Logo from '../../images/werankLogo.png'; // Adjust the import path to your logo's location
import {validateAll} from './authValidation'
import { useNavigate } from 'react-router-dom';
import ForgotPasswordModal from '../../components/modals/forgotPasswordModal';



const AuthForm = ({ mode, onFormSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const newErrors = validateAll({ email, password, confirmPassword, mode, firstName, lastName, username });
    setErrors(newErrors)
    setIsFormValid(Object.keys(newErrors).length === 0);
  }, [email, password, firstName, lastName, username, confirmPassword, mode]);
  
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);

  const handleForgotPasswordClick = () => {
    setIsForgotPasswordModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsForgotPasswordModalOpen(false);
  };


  const navigate = useNavigate();

  const goToSignUp = () => {
    navigate('/signup'); // Use the route you have defined for your signup page
  };

  // Inside AuthForm component
const handleSubmit = (event) => {
  event.preventDefault();
  
  if (Object.keys(errors).length === 0) {
    const formData = {
      ...(mode === 'signup' && { firstName, lastName, username }),
      email,
      password,
      
    };

    // Call the onFormSubmit prop with the formData
    onFormSubmit(formData, mode);
  }
};


  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Paper elevation={10} style={{ padding: 30 }}>
      <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <img src={Logo} alt="Logo" style={{ width: '380px', marginBottom: '2px' }} />
        </Box>
      <form onSubmit={handleSubmit}>
        {mode === 'signup' && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="First Name"
                autoFocus
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
          </Grid>
        )}
        <TextField
          required
          fullWidth
          margin="normal"
          label="Email Address"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          required
          fullWidth
          margin="normal"
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {mode === 'signup' && (
          <TextField
            required
            fullWidth
            margin="normal"
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={!isFormValid}
          style={{ marginTop: '16px' }}
        >
          {mode === 'login' ? 'Sign In' : 'Sign Up'}
        </Button>
        {mode === 'login' && (
          <Grid my={2} container direction="column" spacing={2}>
          <Grid item xs={12}>
            <Link 
              variant="body2"
              onClick={handleForgotPasswordClick}
              style={{ display: 'block', textAlign: 'center', cursor: 'pointer' }}
            >
              Forgot password?
            </Link>
          </Grid>
          <Grid item xs={12}> {/* Full width */}
            <Link 
              variant="body2"
              onClick={(e) => {
                e.preventDefault();
                goToSignUp();}}
                style={{ display: 'block', textAlign: 'center', cursor: 'pointer' }}>
              Don't have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
        
        )}
      </form>
      <ForgotPasswordModal
        open={isForgotPasswordModalOpen}
        onClose={handleCloseModal}
      />
    </Paper>

    </Box>
      );
};

export default AuthForm;
