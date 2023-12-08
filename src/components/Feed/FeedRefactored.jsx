import React, { useState, useEffect } from 'react';
import { Card, Box, Typography, styled } from '@mui/material';
import { useSelector } from 'react-redux';
import LoadingModal from '../../shared/LoadingModal/LoadingModal';
import FeedItem from './FeedItem';
import FeedTab from '../Feed/FeedTab';
import useFetchFeedData from '../../hooks/Feed/useFetchFeedData';
import useUserCredentials from '../../hooks/User/useUserCredentials';

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  // Add any additional styles that were previously in useStyles for the Card
}));

const ScrollableContainer = styled(Box)(({ theme }) => ({
  maxHeight: 'calc(100vh - 100px)',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
}));

export const Feed = () => {
  const token = useSelector((state) => state.auth.token);
  const [selectedTab, setSelectedTab] = useState(0);
  const { isLoading, feedData } = useFetchFeedData(selectedTab, token);
  
  const { userCredentials, fetchUserCredentials } = useUserCredentials();
  useEffect(() => {
    feedData.forEach(feedItem => {
      fetchUserCredentials(feedItem.userId);
    });
  }, [feedData]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <StyledCard>

      <FeedTab selectedTab={selectedTab} onTabChange={handleTabChange} variant="fullWidth"/>

      <ScrollableContainer p={3}>
        {feedData.map((feedItem, index) => (
          <FeedItem
            key={index}
            feedItem={feedItem}
            listCategory={feedItem.categoryId ? feedItem.categoryId.categoryName : 'Unknown'}
            userCredentials={userCredentials}
            fetchUserCredentials={fetchUserCredentials}
          />
        ))}
      </ScrollableContainer>
    </StyledCard>
  );
};

export default Feed;
