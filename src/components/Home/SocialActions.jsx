import React, { useState } from 'react';
import { Box, IconButton, Tooltip } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import CommentIcon from '@material-ui/icons/Comment';
import EditIcon from '@material-ui/icons/Edit';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { addListToWatchlist, removeListFromWatchlist } from '../../api/SocialActions/SocialActions';
import { useSelector } from 'react-redux'; 

// SocialActions component
const SocialActions = ({ postId, isInitiallyWatchlisted }) => {
  const [isWatchlisted, setIsWatchlisted] = useState(isInitiallyWatchlisted);
  const token = useSelector((state) => state.auth.token);

  const handleUpvote = async () => {
    // ... logic for upvote
  };

  const handleDownvote = async () => {
    // ... logic for downvote
  };

  const handleComment = async () => {
    // ... logic for comment
  };

  const handleContribute = async () => {
    // ... logic for contribute
  };
  const handleWatchlist = async () => {
    try {
      if (isWatchlisted) {
        await removeListFromWatchlist(postId, token);
      } else {
        await addListToWatchlist(postId, token);
      }
      setIsWatchlisted(!isWatchlisted);
    } catch (error) {
      console.error('Error updating watchlist:', error);
      // Handle the error as needed, possibly with user feedback
    }
  };



  return (
    <Box display="flex" justifyContent="space-around" alignItems="center">
      <Tooltip title="Upvote" arrow>
        <IconButton onClick={handleUpvote}>
          <ThumbUpIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Downvote" arrow>
        <IconButton onClick={handleDownvote}>
          <ThumbDownIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Comment" arrow>
        <IconButton onClick={handleComment}>
          <CommentIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Contribute" arrow>
        <IconButton onClick={handleContribute}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={isWatchlisted ? "Remove from Watchlist" : "Add to Watchlist"} arrow>
        <IconButton onClick={handleWatchlist}>
          {isWatchlisted ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default SocialActions;
