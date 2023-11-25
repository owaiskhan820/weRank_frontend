const API_BASE_URL = 'http://localhost:3000/api/v1'; 

export const fetchAllCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/category/getAll`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Include other headers like authorization if needed
        }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data.categories; // Assuming the response structure based on your backend
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  };

  export const createNewList = async (categoryId, title, listItems, token) => {
    const url = `${API_BASE_URL}/list/createList/?token=${token}`;
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          categoryId,
          listItems
        })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error creating list');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error in creating list:', error);
      throw error;
    }
  };
  
  
  