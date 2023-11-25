const API_BASE_URL = 'http://localhost:3000/api/v1'; // Replace with your actual API base URL


// Function to add a list to the watchlist
export const addListToWatchlist = async (listId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/watchlist/addList?token=${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ listId }),
      });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const updatedWatchlist = await response.json();
    return updatedWatchlist; // Contains the updated watchlist

  } catch (error) {
    console.error('Error adding list to watchlist:', error);
    throw error; // Re-throw the error so the calling function can handle it
  }
};

// Function to remove a list from the watchlist
export const removeListFromWatchlist = async (listId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/watchlist/removeList?token=${token}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ listId }),
      });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result; // Contains the result of the operation

  } catch (error) {
    console.error('Error removing list from watchlist:', error);
    throw error; // Re-throw the error so the calling function can handle it
  }
};

export const isListInWatchlist = async (listId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/watchlist/isListInWatchlist?token=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ listId }), // Include both listId and token in the body
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.isListInWatchlist; // Returns true or false
  } catch (error) {
    console.error('Error checking list in watchlist:', error);
    throw error;
  }
};


// Function to upvote or downvote a list
export const voteOnList = async (listId, voteType, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/list/vote/?token=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ voteType, listId }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error voting on list:', error);
        throw error;
    }
};


export const getUserVoteType = async (listId, token) => {
  try {
      const response = await fetch(`${API_BASE_URL}/list/getUserVoteStatus/?token=${token}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ listId }),
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response}`);
      }

      const voteInfo = await response.json();
      return voteInfo; 
  } catch (error) {
      console.error('Error getting user vote type:', error);
      throw error;
  }
};


export const fetchCommentsByListId = async (listId, token) => {
  try {
      const response = await fetch(`${API_BASE_URL}/list/comments/${listId}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const comments = await response.json();
      return comments; // Returns the list of comments
  } catch (error) {
      console.error('Error fetching comments:', error);
      throw error; // Re-throw the error so the calling component can handle it
  }};

// Function to post a comment
export const postComment = async (listId, text, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/list/addComment/?token=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ listId, text }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const newComment = await response.json();
    return newComment;
  } catch (error) {
    console.error('Error posting comment:', error);
    throw error;
  }
};

export const deleteComment = async (commentId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/list/deleteComment/?token=${token}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ commentId }),

    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};

export const rearrangeList = async (listId, listItems, token) => {
  console.log(listId)
  try {
  
    const response = await fetch(`${API_BASE_URL}/list/rearrangeList/${listId}?token=${token}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ listItems }), 
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error rearranging list');
    }

    return await response.json(); 
  } catch (error) {
    console.error('Error rearranging list:', error);
    throw error;
  }
};
