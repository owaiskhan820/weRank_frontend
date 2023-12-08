import React, { useState, useEffect } from 'react';
import { Typography, Button, Link, styled } from '@mui/material';
import { useSelector } from 'react-redux';
import { getProfileByUserId } from '../../api/profile/profile';
import EditProfileModal from './EditProfileModal';

// Styled components
const AboutContainer = styled('div')(({ theme }) => ({
  // Add your styles here
}));

const SocialLink = styled(Typography)(({ theme }) => ({
  // Style for social link typography
}));

const About = ({ userId }) => {
  const [userProfile, setUserProfile] = useState({
    name: '',
    bio: '',
    location: '',
    phone: '',
    socialLinks: {},
    interests: []
  });
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const loggedInUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getProfileByUserId(userId);
        setUserProfile(profile);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleEditModalOpen = () => {
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const isOwnProfile = loggedInUser._id === userId;

  return (
    <AboutContainer>
      <Typography variant="h5">{userProfile.name}</Typography>
      <Typography variant="subtitle1">{userProfile.bio}</Typography>
      <Typography variant="subtitle1">{userProfile.location}</Typography>
      <Typography variant="subtitle1">{userProfile.phone}</Typography>

      {Object.entries(userProfile.socialLinks).map(([key, value]) => (
        value && (
          <SocialLink key={key}>
            {key.charAt(0).toUpperCase() + key.slice(1)}: <Link href={value} target="_blank">{value}</Link>
          </SocialLink>
        )
      ))}

      {isOwnProfile && (
        <Button onClick={handleEditModalOpen}>Edit Profile</Button>
      )}
      <EditProfileModal 
        open={isEditModalOpen} 
        handleClose={handleEditModalClose} 
        userProfile={userProfile}
      />
    </AboutContainer>
  );
};

export default About;
