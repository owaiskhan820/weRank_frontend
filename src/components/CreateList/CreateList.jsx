import React, { useState, useEffect } from 'react';
import { fetchAllCategories } from '../../api/CreateList/createList';
import { TextField, Button, makeStyles, CircularProgress, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import WikipediaSearch from './WikipediaSearch';
import {createNewList} from '../../api/CreateList/createList'
import { useSelector } from 'react-redux';
import IntroductionScreen from './introductionScreen';
import ListForm from './ListForm';
const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#fff',
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(4),
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .05)',
  },
  formControl: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  button: {
    backgroundColor: '#0A6A69',
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#00796b',
    },
    marginTop: theme.spacing(2),
  },
  heading: {
    color: '#0A6A69',
    marginBottom: theme.spacing(2),
  },

  loadingContainer: {
    height: '100vh', // Full view height
    display: 'flex',
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
  },
}));


const CategoryComponent = () => {
  const classes = useStyles();
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


  const [showIntro, setShowIntro] = useState(true);

  // ... useEffects and functions ...

  // Call this function when the user clicks 'Continue' on the IntroductionScreen
  const handleContinue = () => {
    setShowIntro(false);
  };

  if (loading) return <div className={classes.loadingContainer}>
                        <CircularProgress />
                      </div>

  if (showIntro) {
    // If showIntro is true, render only the IntroductionScreen
    return <IntroductionScreen onContinue={handleContinue} />;
  }

  return (
  <ListForm/>
  );
};
export default CategoryComponent;
