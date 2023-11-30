import { makeStyles, CircularProgress } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  loadingContainer: {
    height: '100vh', // Full view height
    display: 'flex',
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
  },
}));


const LoadingModal = () => {
  const classes = useStyles();

  return (
    <div className={classes.loadingContainer}>
      <CircularProgress />
    </div>
  );
};

export default LoadingModal;
