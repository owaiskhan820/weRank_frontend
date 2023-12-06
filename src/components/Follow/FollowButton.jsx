// FollowButton.js
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { followUser, unfollowUser, checkIfFollowing } from '../../api/Follow/Follow'; // Update the import path

const FollowButton = ({ targetUserId }) => {

  const [isFollowing, setIsFollowing] = useState(false);
  const token = useSelector((state) => state.auth.token); // Get token from Redux store
  const loggedInUserId = useSelector((state) => state.auth.user._id); // Get logged-in user's ID from Redux store

  useEffect(() => {
    const checkFollowStatus = async () => {
      try {
        const followingStatus = await checkIfFollowing(targetUserId, token);
        if(!followingStatus){
            console.log("no working")

        }
        else{
            console.log(followingStatus)

        }
        setIsFollowing(followingStatus);
      } catch (error) {
        console.error('Error checking follow status:', error);
      }
    };

    if (loggedInUserId && targetUserId) {
      checkFollowStatus();
    }
  }, [loggedInUserId, targetUserId, token]);

  const handleFollowClick = async () => {
    try {
      if (isFollowing) {
        await unfollowUser(targetUserId, token);
      } else {
        await followUser(targetUserId, token);
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error('Error in handleFollowClick:', error);
    }
  };

  return (
    <Button variant="contained" onClick={handleFollowClick}>
      {isFollowing ? 'Following' : 'Follow'}
    </Button>
  );
};

export default FollowButton;
