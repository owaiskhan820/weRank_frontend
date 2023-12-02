import React from 'react';
import { Avatar } from '@mui/material';
import useUserCredentials from '../../hooks/User/useUserCredentials';

const UserAvatar = ({ userId }) => {
  const { userCredentials } = useUserCredentials();
  return (
    <Avatar src={userCredentials[userId]?.profilePicture } />
  );
};

export default UserAvatar;
