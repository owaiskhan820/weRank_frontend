import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingModal = () => {
  return (
    <div
      sx={{
        height: '100vh', // Full view height
        display: 'flex',
        justifyContent: 'center', // Center horizontally
        alignItems: 'center', // Center vertically
      }}
    >
      <CircularProgress />
    </div>
  );
};

export default LoadingModal;
