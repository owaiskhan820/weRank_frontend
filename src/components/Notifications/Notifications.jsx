import React, { useState, useEffect } from 'react';
import { getNotifications, getUnreadNotifications, markNotificationAsRead } from '../../api/Notifications/Notifications';
import { List, ListItem, ListItemText, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
const Notifications = () => {

  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState([]);
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {

    const fetchNotifications = async () => {
      try {
        const allNotifications = await getNotifications(token);
        const unread = await getUnreadNotifications(token);
        setNotifications(allNotifications);
        setUnreadNotifications(unread);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (notificationId) => {
    try {
      await markNotificationAsRead(notificationId, 'YOUR_USER_TOKEN');
      // Update notifications state as needed
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <List>
      {notifications.map(notification => (
        <React.Fragment key={notification._id}> {/* Use _id as the unique key */}
            <ListItem button onClick={() => handleMarkAsRead(notification._id)}>
            <ListItemText 
                primary={notification.message.title}  // Accessing title from message object
                secondary={notification.message.body} // Accessing body from message object
            />
            </ListItem>
            <Divider />
        </React.Fragment>
        ))}
    </List>
  );
};

export default Notifications;
