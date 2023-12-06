import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, List, ListItem, ListItemText, Typography, Grid, Box, styled } from '@mui/material';
import UserAvatar from '../User/UserAvatar';
import SocialActions from '../../components/SocialActions/SocialActions';
import LoadingModal from '../../shared/LoadingModal/LoadingModal';
import CommentWindow from '../SocialActions/CommentsWindow';
import { isListInWatchlist, getUserVoteType, getListScore } from '../../api/SocialActions/SocialActions';

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  // Add styles for the card
}));

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  // Add styles for the card header
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  // Add styles for the card content
}));

const Username = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
}));

const DateText = styled(Typography)(({ theme }) => ({
  display: 'block',
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
}));

const ListTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: theme.spacing(2),
}));

const ScoreBox = styled(Box)(({ theme }) => ({
  // Styles for the score box
}));



const FeedItem = ({ feedItem, userCredentials, token }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [voteStatus, setVoteStatus] = useState(null); 
  const [showComments, setShowComments] = useState(false);
  const [listScore, setListScore] = useState(null);


  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const fetchListScore = async (feedItemId) => {
    try {
      const score = await getListScore(feedItemId);
      console.log(score);

      setListScore(score);

    } catch (error) {
      console.error("Error fetching list score:", error);
    }
  };

  useEffect(() => {
    const checkWatchlistStatus = async () => {
      try {
            const status = await isListInWatchlist(feedItem._id, token);
            setIsWatchlisted(status);
            const currentVoteStatus = await getUserVoteType(feedItem._id, token); // Fetch vote status
            currentVoteStatus === "upvote" ? setVoteStatus(true) : setVoteStatus(false)
      } catch (error) {
        console.error("Error checking watchlist status:", error);
      }
    };

    checkWatchlistStatus();
    fetchListScore(feedItem._id);
    setIsLoading(false);

  }, [feedItem._id, token]);

  const formattedDate = new Date(feedItem.createdDate).toLocaleDateString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });

  return (
    <StyledCard>
      <StyledCardHeader
        avatar={<UserAvatar userId={feedItem.userId} />}
        title={
          <Grid container alignItems="center">
            <Grid item>
              <Username variant="subtitle1">
                {userCredentials[feedItem.userId]?.username || 'Loading...'}
              </Username>
              <DateText variant="caption">
                {formattedDate}
              </DateText>
            </Grid>
            {listScore !== null && (
              <ScoreBox>
                <Typography variant="subtitle1" component="div">
                  {listScore.toFixed(2)}
                </Typography>
              </ScoreBox>
            )}
          </Grid>
        }
      />
      <StyledCardContent>
        <ListTitle variant="h6">
          {feedItem.title}
        </ListTitle>
        <List>
          {feedItem.listItems.map((item, idx) => (
            <ListItem key={idx}>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
        {isLoading ? <LoadingModal /> : (
          <SocialActions 
            listId={feedItem._id} 
            isInitiallyWatchlisted={isWatchlisted}
            initialVoteType={voteStatus}
            token={token}
            listItems={feedItem}
            onToggleComments={toggleComments}
            onActionComplete={fetchListScore}
          />
        )}
        {showComments && 
          <CommentWindow 
            isVisible={showComments}
            listId={feedItem._id}
            token={token}
            onCommentAdded={fetchListScore}
          />
        }
      </StyledCardContent>
    </StyledCard>
  );
    };  
export default FeedItem;
