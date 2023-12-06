// followApi.js
const API_BASE_URL = 'http://localhost:3000/api/v1/follow'; // Replace with your actual API base URL

export const followUser = async (userIdToFollow, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/followUser/${userIdToFollow}?token=${token}`, {
      method: 'GET',
      headers: {
      },
    });

    if (!response.ok) {
      throw new Error('Error following user');
    }

    return await response.json();
  } catch (error) {
    console.error('Error in followUser:', error);
    throw error;
  }
};

export const unfollowUser = async (userIdToUnfollow, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/unfollow/${userIdToUnfollow}?token=${token}`, {
      method: 'GET',
      headers: {
        
      },
    });

    if (!response.ok) {
      throw new Error('Error unfollowing user');
    }

    return await response.json();
  } catch (error) {
    console.error('Error in unfollowUser:', error);
    throw error;
  }
};

// In your followApi.js

export const checkIfFollowing = async (targetUserId, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/isFollowing/${targetUserId}?token=${token}`, {
        method: 'GET',
        headers: {
        },
      });
  
      if (!response.ok) {
        throw new Error('Error checking follow status');
      }
  
      const data = await response.json();
      return data.isFollowing;
    } catch (error) {
      console.error('Error in checkIfFollowing:', error);
      throw error;
    }
  };
  
