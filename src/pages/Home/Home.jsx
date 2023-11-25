import React from 'react';
import { useSelector } from 'react-redux';
import useEmailVerification from '../../hooks/auth/useEmailVerification';
import Alert from '@mui/material/Alert';
import { LeftSidebar } from '../../components/Home/LeftSidebar';
import { RightSidebar } from '../../components/Home/RightSidebar';
// import { Feed } from '../../components/Home/Feed';
import { makeStyles, Grid } from '@material-ui/core';
import Feed from '../../components/Feed/FeedRefactored'
import { useState } from 'react';
import CreateListComponent from '../../components/CreateList/CreateList';
import ProfileComponent from '../../components/Profile/Profile';


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
  const [currentView, setCurrentView] = useState('feed'); 
  const classes = useStyles();
  const auth  = useSelector((state) => state.auth);
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
            <LeftSidebar onSelectionChange={setCurrentView}/>
          </Grid>
          <Grid item xs={1} md={7}>
            {currentView === 'feed' && <Feed />}
            {currentView === 'createList' && <CreateListComponent />}
            {currentView === 'profile' && <ProfileComponent />}
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
