import { useState, useEffect } from 'react';
import { fetchForYouFeed, fetchFeedByFollowing } from '../../api/Feed/Feed';

const useFetchFeedData = (selectedTab, token) => {
  const [feedData, setFeedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = selectedTab === 0 
          ? await fetchForYouFeed(token)
          : await fetchFeedByFollowing(token);

        setFeedData(data);
        console.log(data)
        
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedTab, token]);

  return { feedData, isLoading };
};

export default useFetchFeedData;
