import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {  getWatchlistByUserId } from '../../api/profile/profile'; // Update the import path
import FeedItem from '../Feed/FeedItem'; // Update the import path
import LoadingModal from '../../shared/LoadingModal/LoadingModal'; // Update the import path
import useStyles from '../../styles/feed/FeedStyles'; // Update the import path

const Watchlist = () => {
  const [myLists, setMyLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
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
    <div className={classes.feedContainer}>
      {myLists.length > 0 ? (
        myLists.map((list) => (
          <FeedItem
            key={list._id}
            feedItem={list}
            userCredentials={{ [user._id]: user }} // Assuming you have user details in the user object from the state
            token={token}
          />
        ))
      ) : (
        <div>You have no lists.</div>
      )}
    </div>
  );
};

export default Watchlist;
