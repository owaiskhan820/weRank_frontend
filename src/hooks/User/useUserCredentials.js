// useUserCredentials.js
import { useState } from 'react';
import { getUserCredentials } from '../../api/user/User';

const useUserCredentials = () => {

  const [userCredentials, setUserCredentials] = useState({});

  const fetchUserCredentials = async (userId) => {

    if (userId) {
      try {

        const credentials = await getUserCredentials(userId);
        setUserCredentials(prevState => ({ ...prevState, [userId]: credentials }));

      } catch (error) {
        console.error('Error fetching user credentials:', error);
      }
    }
  };

  return { userCredentials, fetchUserCredentials };
};

export default useUserCredentials;
