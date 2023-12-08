  import React, { useState, useEffect, Suspense} from 'react';
  import { List, Typography, Grid, ListItem} from '@mui/material';
  import UserAvatar from '../User/UserAvatar';
  import LoadingModal from '../../shared/LoadingModal/LoadingModal';
  import CommentWindow from '../SocialActions/CommentsWindow';
  import { isListInWatchlist, getUserVoteType } from '../../api/SocialActions/SocialActions';
  import {getListScore} from '../../api/List/List'
  import {
    StyledCard,
    StyledCardHeader,
    StyledCardContent,
    Username,
    DateText,
    ListTitle,
    ScoreBox, ItemNumber
  } from '../../components/Feed/styles';
  import CategoryChip from '../SharedComponents/categoryChip'; // Import the new component
  import { useSelector } from 'react-redux';
  const SocialActions = React.lazy(() => import('../../components/SocialActions/SocialActions'));





  const FeedItem = ({ feedItem, userCredentials, listCategory }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isWatchlisted, setIsWatchlisted] = useState(false);
    const [voteStatus, setVoteStatus] = useState({ upvoted: false, downvoted: false });
    const [showComments, setShowComments] = useState(false);
    const [listScore, setListScore] = useState(null);
    const {user, token} = useSelector((state) => state.auth)
    const [isDataReady, setIsDataReady] = useState(false);
    const userId = user._id

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
     const fetchData = async () => {
      try {
        const status = await isListInWatchlist(feedItem._id, userId);
        setIsWatchlisted(status);
    
        const voteStatus = await getUserVoteType(feedItem._id, userId);
        setVoteStatus({
          upvoted: voteStatus.voteType.upvoted,
          downvoted: voteStatus.voteType.downvoted
        });
        await fetchListScore(feedItem._id);
        setIsDataReady(true);


      } catch (error) {
        console.error("Error in fetchData:", error);
      } 
    };
   
     if (feedItem && feedItem._id) {
       fetchData();
     }
   }, [feedItem, token]);


    const formattedDate = new Date(feedItem.createdDate).toLocaleDateString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });


    return (
      <>
      {isLoading ? <LoadingModal/> : 
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
            </Grid>
          }
        />

        <Suspense fallback={<div>Loading Score...</div>}>
          {isDataReady && <ScoreBox sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
            <Typography variant="h6" component="div">
              {listScore !== null ? listScore.toFixed(2) : "0.00"}
            </Typography>
          </ScoreBox>}
        </Suspense>

        <StyledCardContent>
          <ListTitle variant="h6">
            {feedItem.title}
          </ListTitle>
          <List sx={{ width: '100%' }}>
            {feedItem.listItems.map((item, idx) => (
              <ListItem 
                key={idx}
                sx={{ padding: '10px 0' }}
              >
                <ItemNumber>{idx + 1}.</ItemNumber>  
                <CategoryChip 
                  category={listCategory}             
                  label={item.name} 
                />
              </ListItem>
            ))}
      </List> 
          {!isDataReady ? <LoadingModal/> : (
            <Suspense fallback={<div>Loading Social Actions...</div>}>

              <SocialActions 
                listId={feedItem._id} 
                isInitiallyWatchlisted={isWatchlisted}
                initialVoteType={voteStatus}
                token={token}
                listItems={feedItem}
                onToggleComments={toggleComments}
                onActionComplete={fetchListScore}
              />
              
            </Suspense>

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
      </StyledCard>}
      </>
    );
      };  
  export default FeedItem;
