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
