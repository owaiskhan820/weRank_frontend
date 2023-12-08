import React, { useState, useEffect } from 'react';
import { getNotifications, markNotificationAsRead } from '../../api/Notifications/Notifications';
import { List, ListItem, ListItemText, Divider, styled } from '@mui/material';
import { useSelector } from 'react-redux';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const allNotifications = await getNotifications(token);
        setNotifications(allNotifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [token]);

  const handleMarkAsRead = async (notificationId) => {
    try {
      await markNotificationAsRead(notificationId, token);
      setNotifications(notifications.map(notification => 
        notification._id === notificationId ? { ...notification, readStatus: true } : notification
      ));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Styled component for ListItem
  const StyledListItem = styled(ListItem)(({ theme, readstatus }) => ({
    backgroundColor: readstatus ? 'transparent' : 'lightblue',
    '&:hover': {
      backgroundColor: readstatus ? 'transparent' : '#add8e6', // Lighter blue on hover
    },
  }));

  return (
    <List>
      {notifications.map(notification => (
        <React.Fragment key={notification._id}>
          <StyledListItem
            button 
            readstatus={notification.readStatus}
            onClick={() => handleMarkAsRead(notification._id)}
          >
            <ListItemText 
              primary={notification.message.title}
              secondary={notification.message.body}
            />
          </StyledListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
};

export default Notifications;
