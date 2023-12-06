  import React, { useState, useEffect, Suspense} from 'react';
  import { List, Typography, Grid, ListItem} from '@mui/material';
  import UserAvatar from '../User/UserAvatar';
  import SocialActions from '../../components/SocialActions/SocialActions';
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
  import {fetchCategoryById} from '../../api/profile/profile'

  const FeedItem = ({ feedItem, userCredentials, token }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isWatchlisted, setIsWatchlisted] = useState(false);
    const [voteStatus, setVoteStatus] = useState({ upvoted: false, downvoted: false });
    const [showComments, setShowComments] = useState(false);
    const [listScore, setListScore] = useState(null);
    const [categoryNames, setCategoryNames] = useState({});


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
      setIsLoading(true)
       try {
         const status = await isListInWatchlist(feedItem._id, token);
         setIsWatchlisted(status);
   
         const fetchVoteStatus = async () => {
          try {
            const status = await getUserVoteType(feedItem._id, token);
            setVoteStatus({
              upvoted: status.voteType.upvoted,
              downvoted: status.voteType.downvoted
            });
          } catch (error) {
            console.error('Error fetching vote status:', error);
          }
        };
        fetchVoteStatus();

         const score = await getListScore(feedItem._id);
         setListScore(score);
        
         // Fetch category name
         if (feedItem.categoryId && !categoryNames[feedItem.categoryId]) {
           try {
             const category = await fetchCategoryById(feedItem.categoryId);
             setCategoryNames(prevNames => ({
               ...prevNames,
               [feedItem.categoryId]: category ? category.response.category.categoryName : 'Unknown'
             }));
           } catch (err) {
             console.error('Error fetching category:', err);
             setCategoryNames(prevNames => ({
               ...prevNames,
               [feedItem.categoryId]: 'Unknown'
             }));
           }
         }
       } catch (error) {
         console.error("Error in fetchData:", error);
       } finally {
         setIsLoading(false);
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

    if (isLoading) {
      return <LoadingModal />; 
    }

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
            </Grid>
          }
        />
        <ScoreBox sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
        <Typography variant="h6" component="div">
          {listScore !== null ? listScore.toFixed(2) : "0.00"}
        </Typography>
      </ScoreBox>
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
                <ItemNumber>{idx + 1}.</ItemNumber> {/* Add numbering next to each item */}
                <CategoryChip 
                  category={categoryNames[feedItem.categoryId] || 'Unknown'}                  
                  label={item.name} 
                />
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
