import React from 'react';
import { Card, CardHeader, CardContent, List, ListItem, ListItemText, Typography, Grid } from '@material-ui/core';
import UserAvatar from '../User/UserAvatar';
import SocialActions from '../../components/SocialActions/SocialActions';
import useStyles from '../../styles/feed/FeedStyles'; // Make sure this import path is correct
import { useState, useEffect } from 'react';
import { isListInWatchlist, getUserVoteType } from '../../api/SocialActions/SocialActions';
import LoadingModal from '../../shared/LoadingModal/LoadingModal'
import CommentWindow from '../SocialActions/CommentsWindow';
import { getListScore } from '../../api/List/List';

const FeedItem = ({ feedItem, userCredentials, token }) => {
  const classes = useStyles();
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
    <Card className={classes.card}>
      <CardHeader
        avatar={<UserAvatar userId={feedItem.userId} />}
        title={
          <Grid container alignItems="center">
            <Grid item>
              <Typography variant="subtitle1" className={classes.username}>
                {userCredentials[feedItem.userId]?.username || 'Loading...'}
              </Typography>
              <Typography variant="caption" className={classes.date}>
                {formattedDate}
              </Typography>
            </Grid>
             {listScore !== null && (
              <Grid item xs={12}>
                <Typography variant="body2" align="right">
                  Score: {listScore}
                </Typography>
              </Grid>
            )}
          </Grid>
        }
        className={classes.cardHeader}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="h6" className={classes.listTitle}>
          {feedItem.title}
        </Typography>
        <List>
          {feedItem.listItems.map((item, idx) => (
            <ListItem key={idx}>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
        {isLoading ? (
        <LoadingModal /> // Your loading modal component
      ) : (
        <SocialActions 
          listId={feedItem._id} 
          isInitiallyWatchlisted={isWatchlisted}
          initialVoteType={voteStatus}
          token={token}
          listItems={feedItem}
          onToggleComments={toggleComments}
          onActionComplete={fetchListScore} // Pass the callback as a prop

        />
      )}
       {showComments && 
       <CommentWindow 
          isVisible={showComments}
          listId={feedItem._id}
          token={token}
          onCommentAdded={fetchListScore} // Pass the callback as a prop

          />
          
          }


      </CardContent>

    </Card>
  );
};

export default FeedItem;
