

const API_BASE_URL = 'http://localhost:3000/api/v1/list'; // Your API's base URL

export async function getSuggestedLists(userId) {
    try {
        const response = await fetch(`${API_BASE_URL}/suggestedLists/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
                // Include authorization if required
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const lists = await response.json();
        return lists; // Returns an array of suggested lists
    } catch (error) {
        console.error('Error fetching suggested lists:', error);
        throw error;
    }
}