import React from 'react';
import { Avatar } from '@material-ui/core';
import useUserCredentials from '../../hooks/useUserCredentials';

const UserAvatar = ({ userId }) => {
  const { userCredentials } = useUserCredentials();

  return (
    <Avatar src={userCredentials[userId]?.profilePicture || 'defaultAvatarPath'} />
    // Additional logic for displaying user name if needed
  );
};

export default UserAvatar;
