import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getWatchlistByUserId } from '../../api/profile/profile';
import FeedItem from '../Feed/FeedItem';
import LoadingModal from '../../shared/LoadingModal/LoadingModal';
import { styled } from '@mui/material';

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

const Watchlist = () => {
  const [myLists, setMyLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    setLoading(true);
    getWatchlistByUserId(user._id)
      .then((lists) => {
        setMyLists(lists);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching my lists:', error);
        setLoading(false);
      });
  }, [user._id]);

  if (loading) {
    return <LoadingModal />;
  }

  return (
    <FeedContainer>
      {myLists.length > 0 ? (
        myLists.map((list) => (
          <FeedItem
            key={list._id}
            feedItem={list}
            userCredentials={{ [user._id]: user }}
            token={token}
          />
        ))
      ) : (
        <div>You have no lists.</div>
      )}
    </FeedContainer>
  );
};

export default Watchlist;
