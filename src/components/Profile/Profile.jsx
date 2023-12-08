import React, { useState, useEffect } from 'react';
import { Paper, Avatar, Typography, Tab, Tabs, Box, Button, styled } from '@mui/material';
import MyLists from './MyLists';
import Contributions from './Contributions';
import Watchlist from './Watchlist';
import FollowComponent from './FollowComponent';
import About from './About';
import { useSelector } from 'react-redux';
import EditProfileModal from './EditProfileModal';
import { getUserCredentials } from '../../api/user/User'; // Import the function
import FollowButton from '../Follow/FollowButton';



const ProfileHeader = styled('div')(({ theme }) => ({
  textAlign: 'center',
  paddingBottom: theme.spacing(4),
  paddingTop: theme.spacing(8),
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(15),
  height: theme.spacing(15),
  margin: 'auto',
  marginTop: theme.spacing(-8),
  border: '4px solid white',
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    backgroundColor: '#0A6A69',
  },
  '& .MuiTab-root': {
    '&.Mui-selected': {
      color: '#0A6A69',
    },
    '&:hover': {
      color: '#0A6A69',
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export const Profile = ({ userId }) => {
  const { user, token } = useSelector((state) => state.auth);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const userCheck = userId === user._id;
  const title = userCheck ? 'My Lists' :  'User Lists';
  const [userProfile, setUserProfile] = useState({
    userId: '',
    name: '',
    username: '',
    profilePicture: '',
    bio: ''
  });
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getUserCredentials(userId);
        // Combine first and last name into a single name field
        const name = `${profile.firstName} ${profile.lastName}`;
        console.log(profile)
        setUserProfile({
          userId: profile.userId,
          name, // Set the combined name
          username:profile.username,
          profilePicture: profile.profilePicture,
          bio: profile.bio
        });
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchUserProfile();
  }, [userId]);


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
      <ProfileHeader>
        <StyledAvatar src={userProfile.profilePicture || '/path/to/default-profile-image.jpg'} />
        <Typography variant="h5">{userProfile.name}</Typography>
        <Typography variant="subtitle1">@{userProfile.username}</Typography>
        <Typography variant="subtitle1">{userProfile.bio}</Typography>
        {!userCheck ? <FollowButton targetUserId = {userId}/> : <StyledButton onClick={handleEditModalOpen}>Edit Profile</StyledButton>}
      </ProfileHeader>

        <StyledTabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
            <Tab label={title} />
            <Tab label="Contributions" />
            <Tab label="Watchlisted" />
            <Tab label="Followers" /> {/* Replace 456 with dynamic number */}
            <Tab label="Following" /> {/* Replace 123 with dynamic number */}
            <Tab label="About" />
            <EditProfileModal 
            open={isEditModalOpen} 
            handleClose={handleEditModalClose}
            user={user} // Pass user data to modal
            token={token} // Pass token to modal
          />
        </StyledTabs>
        <EditProfileModal
          open={isEditModalOpen}
          handleClose={handleEditModalClose}
          user={user}
          token={token}
        />
      </Paper>
      <Box p={3}>
         {/* Content for the selected tab */}
        {selectedTab === 0 && <Typography><MyLists userId={userId}/></Typography>}
        {selectedTab === 1 && <Typography> <Contributions userId={userId}/></Typography>}
        {selectedTab === 2 && <Typography><Watchlist userId={userId} /></Typography>}
        {selectedTab === 3 && <Typography><FollowComponent userId={userId}  token={token} type='followers'/></Typography>}
        {selectedTab === 4 && <Typography><FollowComponent userId={userId} token={token} type='following'/></Typography>}
        {selectedTab === 5 && <Typography><About userId={userId}/></Typography>}
      {/* Add content for your other tabs */}
      </Box>
    </>
  );
};

export default Profile;
