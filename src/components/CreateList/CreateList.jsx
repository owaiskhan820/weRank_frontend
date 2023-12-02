import React, { useState, useEffect } from 'react';
import { CircularProgress, styled } from '@mui/material';
import { fetchAllCategories } from '../../api/CreateList/createList';
import { useSelector } from 'react-redux';
import IntroductionScreen from './introductionScreen';
import ListForm from './ListForm';
import { createNewList } from '../../api/CreateList/createList';
// Styled components
const Container = styled('div')(({ theme }) => ({
  backgroundColor: '#fff',
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  maxWidth: 600,
  margin: 'auto',
  marginTop: theme.spacing(4),
  boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .05)',
}));

const LoadingContainer = styled('div')({
  height: '100vh', // Full view height
  display: 'flex',
  justifyContent: 'center', // Center horizontally
  alignItems: 'center', // Center vertically
});

const CategoryComponent = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const auth = useSelector((state) => state.auth);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [listTitle, setListTitle] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  

  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      setLoading(true);
      try {
        const fetchedCategories = await fetchAllCategories();
        if (isMounted) {
          setCategories(fetchedCategories);
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

  
  const handleContinue = () => {
    setShowIntro(false);
  };

  if (loading) {
    return (
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
    );
  }

  if (showIntro) {
    return <IntroductionScreen onContinue={handleContinue} />;
  }

  return (
    <Container>
      <ListForm />
    </Container>
  );
};

export default CategoryComponent;