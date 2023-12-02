import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getFollowingByUserId, getFollowersByUserId } from '../../api/profile/profile'; // Import your API calls
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

const FollowComponent = ({ userId, token, type }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const defaultAvatar = '/path/to/default/avatar.jpg'; // Replace with your default avatar image path

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        let data;
        if (type === 'following') {
          data = await getFollowingByUserId(userId);
        } else if (type === 'followers') {
          data = await getFollowersByUserId(userId);
        }
        setUsers(data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, token, type]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <List>
      {users.length > 0 ? (
        users.map((user) => (
          <ListItem key={user.userId}>
            <ListItemAvatar>
              <Avatar src={user.avatarUrl || defaultAvatar} />
            </ListItemAvatar>
            <ListItemText 
              primary={`${user.firstName} ${user.lastName}`} 
              secondary={`@${user.username}`} // Username as subtext with @ sign
            />
          </ListItem>
        ))
      ) : (
        <Typography variant="subtitle1">
          {type === 'following' ? 'No following found.' : 'No followers found.'}
        </Typography>
      )}
    </List>
  );
};

export default FollowComponent;
