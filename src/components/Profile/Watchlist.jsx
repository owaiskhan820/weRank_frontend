import React, { useState, useEffect } from 'react';
import FeedItem from '../Feed/FeedItem';
import LoadingModal from '../../shared/LoadingModal/LoadingModal';
import { styled } from '@mui/material';
import useUserCredentials from '../../hooks/User/useUserCredentials'; // Import the custom hook
import useFetchProfileData from '../../hooks/profile/useFetchProfileData'; // Import the custom hook

// Styled component for feed container
const FeedContainer = styled('div')(({ theme }) => ({
  maxHeight: 'calc(100vh - 100px)',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
}));

const Watchlist = ({ userId }) => {
  const { data: myLists, isLoading } = useFetchProfileData(userId, 'watchlist');
  const { userCredentials, fetchUserCredentials } = useUserCredentials();

  useEffect(() => {
    // Fetch user credentials for each list's user
    myLists.forEach(list => {
      fetchUserCredentials(list.userId);
    });
  }, [myLists, fetchUserCredentials]);

  if (isLoading) {
    return <LoadingModal />;
  }

  return (
    <FeedContainer>
      {myLists.length > 0 ? (
        myLists.map((list) => (
          <FeedItem
            key={list._id}
            feedItem={list}
            listCategory={myLists.categoryId ? myLists.categoryId.categoryName : 'Unknown'}
            userCredentials={userCredentials}
            fetchUserCredentials={fetchUserCredentials}
            />
        ))
      ) : (
        <div>Your watchList is empty</div>
      )}
    </FeedContainer>
  );
};

export default Watchlist;
