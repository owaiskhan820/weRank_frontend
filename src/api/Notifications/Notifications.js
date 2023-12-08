const API_BASE_URL = 'http://localhost:3000/api/v1/notify'; // Your API's base URL



export const getNotifications = async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/getNotifications?token=${token}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.message || "An error occurred while fetching notifications.");
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  };
  export const getUnreadNotifications = async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/Notifications/unread?token=${token}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.message || "An error occurred while fetching unread notifications.");
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error fetching unread notifications:', error);
      throw error;
    }
  };

  export const markNotificationAsRead = async (notificationId, token) => {
    const url = `${API_BASE_URL}/notifications/read/${notificationId}?token=${token}`;
  
    try {
      const response = await fetch(url, {
        method: 'GET', // You might want to use PATCH or PUT method to update the status
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Assuming you are using Bearer token
        },
      });
  
      if (!response.ok) {
        // If HTTP-status is 4xx or 5xx, throw an error with the message from the server
        const errorBody = await response.json();
        throw new Error(errorBody.message || 'Failed to mark notification as read');
      }
  
      // If everything went fine, return the response
      return await response.json();
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  };
  