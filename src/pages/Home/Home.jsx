import React from 'react';
import { useSelector } from 'react-redux';
import useEmailVerification from '../../hooks/auth/useEmailVerification';
import Alert from '@mui/material/Alert';
import { LeftSidebar } from '../../components/Home/LeftSidebar';
import { RightSidebar } from '../../components/Home/RightSidebar';
import { Feed } from '../../components/Home/Feed';
import { makeStyles, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  sidebar: {
    [theme.breakpoints.down('md')]: {
      display: 'none', // Hide sidebars on smaller screens
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  const auth  = useSelector((state) => state.auth);
  console.log(auth)
  const { isVerified, isFirstVerification } = useEmailVerification();

  return (
    <div className={classes.root}>
      {auth.user && !isVerified && (
        <Alert severity="info">
          Hi {auth.user.username}, please consider verifying your email.
        </Alert>
      )}
      {isFirstVerification && (
        <Alert severity="success">
          Hi {auth.user.username}, you have successfully verified your email.
        </Alert>
      )}
      <div className={classes.content}>
        <Grid container spacing={2}>
          <Grid item xs={false} md={2} className={classes.sidebar}>
            <LeftSidebar />
          </Grid>
          <Grid item xs={1} md={7}>
            <Feed />
          </Grid>
          <Grid item xs={false} md={3} className={classes.sidebar}>
            <RightSidebar />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Home;
