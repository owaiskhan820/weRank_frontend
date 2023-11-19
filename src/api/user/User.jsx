const API_BASE_URL = 'http://localhost:3000/api/v1/user'; // Your API's base URL

export async function getUserCredentials(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/userCredentials/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Include authorization header if needed
          // 'Authorization': `Bearer ${yourAuthToken}`,
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const userProfile = await response.json();
      return userProfile; // Returns the user profile object
  
    } catch (error) {
      console.error('Error fetching user credentials:', error);
      throw error; // Re-throw the error so the calling function can handle it
    }
  }

  export async function getSuggestedUsers(userId) {
      try {
          const response = await fetch(`${API_BASE_URL}/suggestedUsers/${userId}`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  // Include authorization header if needed
                  // 'Authorization': `Bearer ${yourAuthToken}`,
              }
          });
  
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          const suggestedUsers = await response.json();
          return suggestedUsers; // Returns an array of suggested users
  
      } catch (error) {
          console.error('Error fetching suggested users:', error);
          throw error; // Re-throw the error so the calling function can handle it
      }
  }
  