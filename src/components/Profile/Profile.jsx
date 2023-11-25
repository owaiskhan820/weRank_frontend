import React from 'react';
import { Paper, Avatar, Typography, Tab, Tabs, Box, Button } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import MyLists from './MyLists';
import Contributions from './Contributions';
import Watchlist from './Watchlist'
import FollowComponent from './FollowComponent';
import { useSelector } from 'react-redux';
import EditProfileModal from './EditProfileModal'; // Import the modal component you will create
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  profileHeader: {
    textAlign: 'center',
    paddingBottom: theme.spacing(4),
    paddingTop: theme.spacing(8), // Increase padding to push content down
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    margin: 'auto', // Center the avatar horizontally
    marginTop: theme.spacing(-8), // Pull the avatar up to half its height
    border: '4px solid white', // Adjust border color as needed
  },
  tabs: {
    '& .MuiTabs-indicator': {
      backgroundColor: '#0A6A69', // Use the main color for the indicator
    },
    '& .MuiTab-root': {
      '&.Mui-selected': {
        color: '#0A6A69', // Use the main color for the selected tab text
      },
      '&:hover': {
        color: '#0A6A69', // Use the main color for hover state
      },
    },
  },

  button: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  // Add more styles here...
}));

export const Profile = () => {
  const{user, token} = useSelector((state) => state.auth);
  const [isEditModalOpen, setEditModalOpen] = useState(false);


  const classes = useStyles();
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };


  const handleEditModalOpen = () => {
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  return (
  <>
    <Paper elevation={3}>
      <div className={classes.profileHeader}>
        <Avatar className={classes.avatar} src="/path/to/profile-image.jpg" />
        <Typography variant="h5">Username</Typography>
        <Typography variant="subtitle1">A short bio or tagline</Typography>
        <Button className={classes.buttonSave} onClick={handleEditModalOpen}>
            Edit Profile
          </Button>
      </div>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        className={classes.tabs}
      >
        <Tab label="My Lists" />
        <Tab label="Contributions" />
        <Tab label="Watchlisted" />
        <Tab label="Followers 456" /> {/* Replace 456 with dynamic number */}
        <Tab label="Following 123" /> {/* Replace 123 with dynamic number */}
        <Tab label="About" />
        <EditProfileModal 
        open={isEditModalOpen} 
        handleClose={handleEditModalClose}
        user={user} // Pass user data to modal
        token={token} // Pass token to modal
      />
      </Tabs>
    </Paper>
    <Box p={3}>
    {/* Content for the selected tab */}
    {selectedTab === 0 && <Typography><MyLists /></Typography>}
    {selectedTab === 1 && <Typography> <Contributions/></Typography>}
    {selectedTab === 2 && <Typography><Watchlist /></Typography>}
    {selectedTab === 3 && <Typography><FollowComponent userId={user._id} token={token} type='followers'/></Typography>}
    {selectedTab === 4 && <Typography><FollowComponent userId={user._id} token={token} type='following'/></Typography>}
    {selectedTab === 5 && <Typography>About content...</Typography>}
    {/* Add content for your other tabs */}
  </Box></>
  );
};

export default Profile;
