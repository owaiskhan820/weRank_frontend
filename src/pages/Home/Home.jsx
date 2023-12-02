import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useEmailVerification from '../../hooks/auth/useEmailVerification';
import Alert from '@mui/material/Alert';
import { LeftSidebar } from '../../components/Home/LeftSidebar';
import { RightSidebar } from '../../components/Home/RightSidebar';
import { Grid, styled } from '@mui/material';
import Feed from '../../components/Feed/FeedRefactored';
import CreateListComponent from '../../components/CreateList/CreateList';
import ProfileComponent from '../../components/Profile/Profile';
import Notifications from '../../components/Notifications/Notifications';

const RootContainer = styled('div')(({ theme }) => ({
  flexGrow: 1,
}));

const Sidebar = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const Home = () => {
  const [currentView, setCurrentView] = useState('feed');
  const auth = useSelector((state) => state.auth);
  const { isVerified, isFirstVerification } = useEmailVerification();

  return (
    <RootContainer>
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
      <Grid container spacing={2}>
        <Sidebar item xs={false} md={2}>
          <LeftSidebar onSelectionChange={setCurrentView} />
        </Sidebar>
        <Grid item xs={12} md={7}>
          {currentView === 'feed' && <Feed />}
          {currentView === 'createList' && <CreateListComponent />}
          {currentView === 'profile' && <ProfileComponent />}
          {currentView === 'notifications' && <Notifications />}
        </Grid>
        <Sidebar item xs={false} md={3}>
          <RightSidebar />
        </Sidebar>
      </Grid>
    </RootContainer>
  );
};

export default Home;
