const API_BASE_URL = 'http://localhost:3000/api/v1'; // Your API's base URL
export const getListByUserId = async (userId) => {
    const url = `${API_BASE_URL}/list/getListByUserId/${userId}`;
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
        }
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error retrieving list');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error in fetching lists:', error);
      throw error;
    }
  };
  
  // In your API utility file (e.g., contributionsAPI.js)
export const getUserContributions = async (userId) => {
  const url = `${API_BASE_URL}/user/user-contributions/${userId}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error fetching user contributions');
    }

    return await response.json();
  } catch (error) {
    console.error('Error in fetching user contributions:', error);
    throw error;
  }
};

// Assuming API_BASE_URL is the base URL of your backend server

export const getWatchlistByUserId = async (userId, token) => {
  try {
    // Send a GET request to the backend endpoint
    const response = await fetch(`${API_BASE_URL}/watchlist/getWatchlistById?id=${userId}`, {
      method: 'GET',
      headers: {
        // Include the token in the request headers for authentication
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      // Handle non-successful responses
      throw new Error('Failed to fetch watchlist');
    }

    // Parse and return the response JSON
    return await response.json();
  } catch (error) {
    console.error('Error fetching watchlist:', error);
    throw error;
  }
};

// API_BASE_URL should be the base URL of your backend server

export const getFollowingByUserId = async (userId) => {
  try {
    // Make a GET request to the server to fetch the following list
    const response = await fetch(`${API_BASE_URL}/follow/following/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'

      },
    });

    if (!response.ok) {
      // If the server response is not ok, throw an error with the status
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // If the response is ok, parse it as JSON
    const data = await response.json();
    return data;
  } catch (error) {
    // Log and re-throw the error so it can be caught and handled where the API call is made
    console.error('Error fetching following list:', error);
    throw error;
  }
};

export const getFollowersByUserId = async (userId) => {
  try {
    // Make a GET request to the server to fetch the following list
    const response = await fetch(`${API_BASE_URL}/follow/followers/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'

      },
    });

    if (!response.ok) {
      // If the server response is not ok, throw an error with the status
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // If the response is ok, parse it as JSON
    const data = await response.json();
    return data;
  } catch (error) {
    // Log and re-throw the error so it can be caught and handled where the API call is made
    console.error('Error fetching following list:', error);
    throw error;
  }
};


// API call to update the profile
export const updateProfile = async (token, profileData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/profile/update-profile/?token=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
         
      },
      body: JSON.stringify(profileData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'An error occurred while updating the profile.');
    }

    return data;
  } catch (error) {
    throw error;
  }
};


export const getProfileByUserId = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/profile/getProfilebyId/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Include authorization header if needed
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const profileData = await response.json();
    return profileData;
  } catch (error) {
    console.error('Error fetching profile data:', error);
    throw error;
  }
};

export const fetchCategoryById = async (categoryId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/category/getCategory/${categoryId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Include authorization header if needed
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const profileData = await response.json();
    return profileData;
  } catch (error) {
    console.error('Error fetching profile data:', error);
    throw error;
  }
};

