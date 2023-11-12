// src/components/ForgotPasswordModal.js
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { sendPasswordResetEmail } from '../../api/Auth/authService'; 

const ForgotPasswordModal = ({ open, onClose }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await sendPasswordResetEmail(email);
      onClose(); // Close the modal
    } catch (error) {
      alert('Failed to send password reset email:', error.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Forgot Password</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Email Address"
          type="email"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Send Reset Email</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ForgotPasswordModal;
