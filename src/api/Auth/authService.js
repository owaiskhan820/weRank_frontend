
const API_BASE_URL = 'http://localhost:3000/api/v1'; // Your API's base URL

export const login = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
     const { user, token } = await response.json();
    if (!response.ok) {
      // If HTTP-status is 4xx or 5xx, throw an error with the message from the server
      throw new Error('Login failed');
    }
    return { user, token };
  } catch (error) {
    // Log the error to the console and re-throw it
    console.error('Login error:', error);
    throw error;
  }
};



export const signup = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json(); // Parse JSON response in any case

    if (!response.ok) {
      // If HTTP-status is 4xx or 5xx, throw an error with the message from the server
      throw new Error(data.message || 'Login failed');
    }
    return data; // This will contain the token on successful login
  } catch (error) {
    // Log the error to the console and re-throw it
    console.error('Login error:', error);
    throw error;
  }
};

export const sendPasswordResetEmail = async (email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    const message = await response.text();  
    console.log(response)
    if (response.ok) {
       alert(message); 
    } else {
       alert(message);
    }
  } catch (error) {
     alert(error.message); 
  }
};


export const resetPassword = async (token, newPassword) => {
  const url = `${API_BASE_URL}/user/reset-password?token=${encodeURIComponent(token)}`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newPassword }),
    });
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.msg || 'Failed to reset password.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};

export const verifyEmailToken = async (token) => {
  const url = `${API_BASE_URL}/user/verify-email?token=${encodeURIComponent(token)}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.msg || 'Failed to reset password.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};


