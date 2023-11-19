import React, { useEffect, useState } from 'react';
import {
  makeStyles,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tabs,
  Tab,
  Box,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useSelector } from 'react-redux';
import { fetchForYouFeed, fetchFeedByFollowing } from '../../api/Feed/Feed';
import { getUserCredentials } from '../../api/user/User'; // Adjust the import path as needed
import LoadingModal from '../../shared/LoadingModal/LoadingModal';
import SocialActions from '../../components/Home/SocialActions';

const useStyles = makeStyles((theme) => ({
  // ... existing styles ...
}));

export const Feed = () => {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);
  const [feedData, setFeedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userCredentials, setUserCredentials] = useState({}); // State to store user credentials

  const token = useSelector((state) => state.auth.token);

  const fetchUserCredentials = async (userId) => {
    if (userId && !userCredentials[userId]) {
      try {
        const credentials = await getUserCredentials(userId);
        setUserCredentials(prevState => ({ ...prevState, [userId]: credentials }));
        console.log(userCredentials)
      } catch (error) {
        console.error('Error fetching user credentials:', error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let data;
        if (selectedTab === 0) {
          data = await fetchForYouFeed(token);
        } else if (selectedTab === 1) {
          data = await fetchFeedByFollowing(token);
        }
        setFeedData(data);
        data.forEach(item => fetchUserCredentials(item.userId));
      } catch (err) {
        console.error('Error fetching feed:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedTab, token]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Card className={classes.card}>
      {isLoading && <LoadingModal />}
      <Tabs value={selectedTab} onChange={handleTabChange} variant="fullWidth" classes={{ indicator: classes.indicator }} aria-label="feed tabs">
        <Tab label="For you" />
        <Tab label="Following" />
      </Tabs>

      <Box p={3} className={classes.scrollableContainer}>
        {feedData.map((feedItem, index) => (
          <Card key={index} className={classes.card}>
            <CardHeader
              avatar={<Avatar aria-label="user" src={userCredentials[feedItem.userId]?.profilePicture || 'defaultAvatarPath'} />}
              title={userCredentials[feedItem.userId]?.username || 'Loading...'}
              subheader={feedItem.title}
              action={<IconButton aria-label="settings"><MoreVertIcon /></IconButton>}
            />
            <CardContent>
              <List>
                {feedItem.listItems.map((item, idx) => (
                  <ListItem key={idx}>
                    <ListItemAvatar>
                      <Avatar className={classes.avatar}>{item.name[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={item.name} />
                  </ListItem>
                ))}
              </List>
              <SocialActions  listId={feedItem.id} />
            </CardContent>
          </Card>
        ))}
      </Box>
    </Card>
  );
};

export default Feed;
