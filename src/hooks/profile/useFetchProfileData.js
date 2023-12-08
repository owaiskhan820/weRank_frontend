import { useState, useEffect } from 'react';
import { getListByUserId, getUserContributions, getWatchlistByUserId } from '../../api/profile/profile';

const useFetchProfileData = (userId, dataType) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let fetchedData;
        switch (dataType) {
          case 'myLists':
            fetchedData = await getListByUserId(userId);
            break;
          case 'contributions':
            fetchedData = await getUserContributions(userId);
            break;
          case 'watchlist':
            fetchedData = await getWatchlistByUserId(userId);
            break;
          default:
            fetchedData = [];
        }
        setData(fetchedData);
        console.log(fetchedData)
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId, dataType]);

  return { data, isLoading };
};

export default useFetchProfileData;
