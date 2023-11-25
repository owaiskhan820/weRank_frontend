import React, { useState, useEffect } from 'react';
import { fetchAllCategories } from '../../api/CreateList/createList';
import { TextField, Button } from '@material-ui/core';
import WikipediaSearch from './WikipediaSearch';
import {createNewList} from '../../api/CreateList/createList'
import { useSelector } from 'react-redux';
const CategoryComponent = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [listTitle, setListTitle] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = useSelector((state) => state.auth); // Assuming 'auth' contains user information

  useEffect(() => {
    let isMounted = true;
  
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const fetchedCategories = await fetchAllCategories();
        if (isMounted) {
          setCategories(fetchedCategories);
          if (fetchedCategories && fetchedCategories.length > 0) {
            setSelectedCategory(fetchedCategories[0]._id);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
  
    fetchCategories();
  
    return () => {
      isMounted = false;
    };
  }, []);
  

  useEffect(() => {
    console.log(categories)
  }, [categories]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleTitleChange = (event) => {
    setListTitle(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const userToken = auth.token;
  
      // Transform selectedItems to match the backend expected format
      const formattedItems = selectedItems.map(item => ({
        name: item.title // Extracting the title and renaming it to name
      }));
  
      console.log(selectedCategory, listTitle, formattedItems, userToken);
      const createdList = await createNewList(selectedCategory, listTitle, formattedItems, userToken);
      console.log('List created successfully:', createdList);
      alert("list Created Successfully")
  
      // Handle post-creation logic here (e.g., show success message, clear form, etc.)
    } catch (error) {
      console.error('Error submitting new list:', error);
    }
  };

  if (loading) return <div>Loading categories...</div>;

  return (
    <div>
      
       <h2>Select a Category</h2>
    <select value={selectedCategory} onChange={handleCategoryChange}>
      {categories.map(category => (
        <option key={category._id} value={category._id}>{category.categoryName}</option>
      ))}
    </select>
      <TextField
        label="List Title"
        placeholder="Create a descriptive title"
        fullWidth
        margin="normal"
        value={listTitle}
        onChange={handleTitleChange}
      />
      <WikipediaSearch setSelectedItems={setSelectedItems} selectedItems = {selectedItems} />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit List
      </Button>
    </div>
  );
};

export default CategoryComponent;
