import React, { useState } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import EditIcon from '@mui/icons-material/Edit';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { TbSquareRoundedArrowUpFilled, TbSquareRoundedArrowUp, TbSquareRoundedArrowDownFilled, TbSquareRoundedArrowDown } from "react-icons/tb";
import ContributeModal from './ContributeModal';
import { addListToWatchlist, removeListFromWatchlist, voteOnList } from '../../api/SocialActions/SocialActions';
import { styled } from '@mui/material';

const ActionBox = styled(Box)(({ theme }) => ({
    borderTop: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: theme.spacing(1),
  }));
  
  const ActionButton = styled(IconButton)(({ theme }) => ({
    margin: theme.spacing(1), // Adds margin around the buttons
  }));
  
  const VoteButton = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1),
    borderRadius: '0', // Square borders
    margin: theme.spacing(1),
  }));

const SocialActions = ({ listId, isInitiallyWatchlisted, initialVoteType, token, onToggleComments, listItems, onActionComplete }) => {
    const [isWatchlisted, setIsWatchlisted] = useState(isInitiallyWatchlisted);
    const[ modalVisible, setModalVisible] = useState(false)
    const [voteStatus, setVoteStatus] = useState(initialVoteType);

    const handleVote = async (voteType) => {
      try {
          const response = await voteOnList(listId, voteType, token);
          if (response.updatedVoteStatus) {
              setVoteStatus({
                  upvoted: response.updatedVoteStatus === 'upvote',
                  downvoted: response.updatedVoteStatus === 'downvote'
              });
          } else {
              setVoteStatus({ upvoted: false, downvoted: false });
          }
          onActionComplete(listId);
      } catch (error) {
          console.error(`Error in voting: ${voteType}`, error);
      }
  };
  
  const handleUpvote = () => handleVote('upvote');
  const handleDownvote = () => handleVote('downvote');

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
    <ActionBox>
     {/* Upvote button */}
     <Tooltip title="Upvote" arrow>
                <ActionButton onClick={handleUpvote}>
                    {voteStatus.upvoted ? <TbSquareRoundedArrowUpFilled /> : <TbSquareRoundedArrowUp />}
                </ActionButton>
            </Tooltip>

            {/* Downvote button */}
            <Tooltip title="Downvote" arrow>
                <ActionButton onClick={handleDownvote}>
                    {voteStatus.downvoted ? <TbSquareRoundedArrowDownFilled /> : <TbSquareRoundedArrowDown />}
                </ActionButton>
            </Tooltip>


      {/* Comment button */}
      <Tooltip title="Comment" arrow>
        <ActionButton onClick={onToggleComments}>
          <CommentIcon />
        </ActionButton>
      </Tooltip>

      {/* Contribute button */}
      <Tooltip title="Contribute" arrow>
        <ActionButton onClick={handleContribute}>
          <EditIcon />
        </ActionButton>
      </Tooltip>

      {/* Watchlist button */}
      <Tooltip title={isWatchlisted ? "Remove from Watchlist" : "Add to Watchlist"} arrow>
        <ActionButton onClick={handleWatchlist}>
          {isWatchlisted ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </ActionButton>
      </Tooltip>

      {/* Contribute Modal */}
      {modalVisible && (
        <ContributeModal
          title={listItems.title} // assuming listItems has a title property
          items={listItems.listItems.map((item, index) => ({
            id: item._id, // assuming each item has a unique _id
            label: item.name, // assuming each item has a name property
          }))}
          isOpen={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      )}
    </ActionBox>
  );
};

export default SocialActions;