import React from 'react';
import { Avatar } from '@material-ui/core';
import useUserCredentials from '../../hooks/User/useUserCredentials';

const UserAvatar = ({ userId }) => {
  const { userCredentials } = useUserCredentials();
  return (
    <Avatar src={userCredentials[userId]?.profilePicture } />
  );
};

export default UserAvatar;
