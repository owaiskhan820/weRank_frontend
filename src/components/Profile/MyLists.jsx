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
  const { data, isLoading } = useFetchProfileData(userId, 'myLists');
  const { userCredentials, fetchUserCredentials } = useUserCredentials();
  console.log("myLists", data)
  useEffect(() => {
    // Fetch user credentials for each list's user
    data.forEach(list => {
      fetchUserCredentials(list.userId);
    });
  }, [data, fetchUserCredentials]);

  if (isLoading) {
    return <LoadingModal />;
  }

  return (
    <FeedContainer>
      {data.length > 0 ? (
        data.map((list) => (
          <FeedItem
            key={list._id}
            feedItem={list}
            listCategory={data.categoryId ? data.categoryId.categoryName : 'Unknown'}
            userCredentials={userCredentials}
            fetchUserCredentials={fetchUserCredentials}
            />
        ))
      ) : (
        <div>You have no lists yet</div>
      )}
    </FeedContainer>
  );
};

export default Watchlist;
