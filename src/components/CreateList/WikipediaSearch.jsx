import React, { useState, useEffect } from 'react';

const WikipediaSearch = ({setSelectedItems, selectedItems}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        performSearch();
      } else {
        setSearchResults([]);
      }
    }, 500); // Delay in ms

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const performSearch = async () => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchTerm)}&format=json&origin=*`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSearchResults(data.query.search);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleResultSelect = (result) => {
    setSelectedItems(prevItems => [...prevItems, result]);
    setSearchTerm(''); // Clear search input
    setSearchResults([]); // Clear search results
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search Wikipedia"
      />
      <div>
        {searchResults.map((result, index) => (
          <div key={index} onClick={() => handleResultSelect(result)}>
            {result.title}
          </div>
        ))}
      </div>
      <div>
        <h2>Selected Items</h2>
        <ul>
          {selectedItems.map((item, index) => (
            <li key={index}>{item.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WikipediaSearch;
