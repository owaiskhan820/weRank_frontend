import React, { useState } from 'react';
import { Card, Box } from '@material-ui/core';
import { useSelector } from 'react-redux';
import LoadingModal from '../../shared/LoadingModal/LoadingModal';
import FeedItem from './FeedItem';
import FeedTab from '../Feed/FeedTab';
import useFetchFeedData from '../../hooks/Feed/useFetchFeedData';
import useUserCredentials from '../../hooks/User/useUserCredentials';
import useStyles from '../../styles/feed/FeedStyles';  // Assuming you have a separate file for styles
import { useEffect } from 'react';

export const Feed = () => {
  const token = useSelector((state) => state.auth.token);
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);
  const { isLoading, feedData } = useFetchFeedData(selectedTab, token );
  const { userCredentials, fetchUserCredentials } = useUserCredentials();


  useEffect(() => {
    feedData.forEach(feedItem => {
      fetchUserCredentials(feedItem.userId);
    });
  }, [feedData]);


  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue); // Update the state with the index of the new tab
  };
  

  return (
    <Card className={classes.card}>
      {isLoading && <LoadingModal />}

      <FeedTab selectedTab={selectedTab} onTabChange={handleTabChange} variant="fullWidth"/>

      <Box p={3} className={classes.scrollableContainer}>
        {feedData.map((feedItem, index) => (
          <FeedItem
          key={index}
          feedItem={feedItem}
          userCredentials={userCredentials}
          fetchUserCredentials={fetchUserCredentials}
          token = {token}
        />
        ))}
      </Box>
    </Card>
  );
};

export default Feed;
