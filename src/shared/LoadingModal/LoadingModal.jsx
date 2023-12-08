import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingModal = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center', // Center horizontally
        alignItems: 'center', // Center vertically
        position: 'relative', // Position relative to the parent
        width: '100%', // Full width of the parent
        height: '100%', // Full height of the parent
        backdropFilter: 'blur(5px)', // Apply blur effect
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent background
      }}
    >
      <CircularProgress />
    </div>
  );
};

export default LoadingModal;
