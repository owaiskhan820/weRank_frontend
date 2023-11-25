
const API_BASE_URL = 'http://localhost:3000/api/v1/userFeed'; // Your API's base URL

export async function fetchFeedByFollowing(token) {
    console.log("running fetch feed by following.")
    try {
        const response = await fetch(`${API_BASE_URL}/feed/following?token=${token}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data;    
    } catch (error) {
        console.error('Error fetching feed by following:', error);
        throw error;
    }
}

export async function fetchForYouFeed(token) {
    try {
        const response = await fetch(`${API_BASE_URL}/feed/your?token=${token}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data;    
    } catch (error) {
        console.error('Error fetching For You feed:', error);
        throw error;
    }
}


