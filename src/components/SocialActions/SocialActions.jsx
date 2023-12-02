import React, { useState } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import EditIcon from '@mui/icons-material/Edit';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { TbSquareRoundedArrowUpFilled, TbSquareRoundedArrowUp, TbSquareRoundedArrowDownFilled, TbSquareRoundedArrowDown } from "react-icons/tb";
import ContributeModal from './ContributeModal';
import { addListToWatchlist, removeListFromWatchlist, voteOnList } from '../../api/SocialActions/SocialActions';


const SocialActions = ({ listId, isInitiallyWatchlisted, initialVoteType, token, onToggleComments, listItems, onActionComplete }) => {
    const [isWatchlisted, setIsWatchlisted] = useState(isInitiallyWatchlisted);
    const[ modalVisible, setModalVisible] = useState(false)
    const [isUpvoted, setUpvote] = useState(initialVoteType )
    const [isDownvoted, setDownVote] = useState(!initialVoteType )


   
    const handleUpvote = async () => {
        try {
            await voteOnList(listId, 'upvote', token);
            setUpvote(!isUpvoted);
            setDownVote(false); // Reset downvote if it was set
            onActionComplete(listId)
        } catch (error) {
            console.error('Error upvoting list:', error);
            // Handle the error appropriately (e.g., show a message to the user)
        }
    };

    const handleDownvote = async () => {
        try {
            await voteOnList(listId, 'downvote', token);
            setDownVote(!isDownvoted);
            setUpvote(false); // Reset upvote if it was set
            onActionComplete(listId)
        } catch (error) {
            console.error('Error downvoting list:', error);
            // Handle the error appropriately
        }
    };

    // Handle contribute action
    const handleContribute = async () => {
        setModalVisible(true)
    };

    // Handle watchlist action
    const handleWatchlist = async () => {
      try {
        if (isWatchlisted) {
          // Call API to remove from watchlist
          await removeListFromWatchlist(listId, token);
        } else {
          // Call API to add to watchlist
          await addListToWatchlist(listId, token);
        }
        // Toggle the watchlist state
        setIsWatchlisted(!isWatchlisted);
      } catch (error) {
        console.error('Error updating watchlist:', error);
        // Handle the error appropriately
      }  
    };

    // Render the social action buttons
    return (
        <Box display="flex" justifyContent="space-around" alignItems="center">
            {/* Upvote button */}
            <Tooltip title="Upvote" arrow>
                <IconButton onClick={handleUpvote}>
                    {isUpvoted ? <TbSquareRoundedArrowUpFilled /> :  <TbSquareRoundedArrowUp />}
                    
                </IconButton>
            </Tooltip>
            {/* Downvote button */}
            <Tooltip title="Downvote" arrow>
                <IconButton onClick={handleDownvote}>
                {isDownvoted ? <TbSquareRoundedArrowDownFilled /> :  <TbSquareRoundedArrowDown />}
                </IconButton>
            </Tooltip>
            {/* Comment button */}
            <Tooltip title="Comment" arrow>
                <IconButton onClick={onToggleComments}>
                    <CommentIcon />
                </IconButton>
            </Tooltip>

            {/* Contribute button */}
            <Tooltip title="Contribute" arrow>
                <IconButton onClick={handleContribute}>
                    <EditIcon />
                </IconButton>
            </Tooltip>
            {/* Watchlist button */}
            <Tooltip title={isWatchlisted ? "Remove from Watchlist" : "Add to Watchlist"} arrow>
                <IconButton onClick={handleWatchlist}>
                    {isWatchlisted ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                </IconButton>
            </Tooltip>
            {modalVisible && <ContributeModal 
                title={listItems} 
                items={listItems.listItems.map((label, index) => ({ id: index, label }))}
                isOpen={modalVisible} 
                onClose={() => setModalVisible(false)}
            />}
        </Box>
    );
};

export default SocialActions;
