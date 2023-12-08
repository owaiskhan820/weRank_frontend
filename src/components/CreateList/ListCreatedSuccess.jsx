import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // React Router hook for navigation

const ListCreatedSuccess = ({ open, handleClose }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    handleClose(); // Close the modal first
    window.location.reload(); // Reload the current page
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>List Created Successfully!</DialogTitle>
      <DialogContent>
        Your list has been created successfully.
      </DialogContent>
      <DialogActions>
        <Button onClick={handleGoHome} color="primary" type= "button">
          Go to Home
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ListCreatedSuccess;
