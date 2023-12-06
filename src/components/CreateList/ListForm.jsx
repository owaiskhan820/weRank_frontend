import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  CircularProgress,
  InputLabel,
  styled
} from '@mui/material';
import { fetchAllCategories } from '../../api/CreateList/createList';
import ListItemSelection from './ListItemSelect';

// Styled components
const FormContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  maxWidth: 600,
  margin: 'auto',
  marginTop: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const TitleStrip = styled(Typography)(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  padding: theme.spacing(1),
  borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
}));

const FormField = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  width: '100%',
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const RadioGroupStyled = styled(RadioGroup)(({ theme }) => ({
  flexDirection: 'row',
  marginBottom: theme.spacing(2),
}));

const LoadingContainer = styled(Box)(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const ListForm = () => {
    const [categories, setCategories] = useState([]);
    const [selectedInterest, setSelectedInterest] = useState('');
    const [selectedCategory, setSelectedCategory] = useState([]);
  
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [visibility, setVisibility] = useState('public'); // default value
    const [loading, setLoading] = useState(false);
    const [showListItemSelection, setShowListItemSelection] = useState(false);
  
    useEffect(() => {
      const fetchCategories = async () => {
        setLoading(true);
        try {
          const fetchedCategories = await fetchAllCategories();
          setCategories(fetchedCategories);
          if (fetchedCategories.length > 0) {
            setSelectedInterest(fetchedCategories[0]._id); // default selection
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchCategories();
    }, []);
  
    const handleDescriptionChange = (event) => {
      setDescription(event.target.value);
    };
  
    const handleTitleChange = (event) => {
      setTitle(event.target.value);
    };
  
  
    const handleVisibilityChange = (event) => {
      setVisibility(event.target.value);
    };
  
    const handleSubmit = () => {
      // Transition to the ListItemSelection component
      setShowListItemSelection(true);
    };
  
  const handleCategoryChange = (event) => {
    setSelectedInterest(event.target.value)
    const newcategory = categories.find(cat => cat._id === event.target.value);
    setSelectedCategory(newcategory);
  };
  
  

  if (loading) {
    return (
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
    );
  }

  if (showListItemSelection) {
    return (
      <ListItemSelection
        selectedCategory={selectedCategory}
        title={title}
        description={description}
        visibility={visibility}
      />
    );
  }

  return (
    <FormContainer>
      <TitleStrip variant="h5">
        Create A List
      </TitleStrip>
      <FormField variant="outlined">
        <InputLabel id="interest-label">Interest</InputLabel>
        <Select
          labelId="interest-label"
          value={selectedInterest}
          onChange={handleCategoryChange}
          label="Interest"
        >
          {categories.map((category) => (
            <MenuItem key={category._id} value={category._id}>
              {category.categoryName}
            </MenuItem>
          ))}
        </Select>
      </FormField>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        multiline
        value={title}
        onChange={handleTitleChange}
      />
      <TextField
        label="Description (Optional)"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={description}
        onChange={handleDescriptionChange}
      />
      <FormField component="fieldset">
        <FormLabel component="legend">Post visibility</FormLabel>
        <RadioGroupStyled
          aria-label="visibility"
          name="visibility"
          value={visibility}
          onChange={handleVisibilityChange}
        >
          <FormControlLabel value="public" control={<Radio />} label="Public" />
          <FormControlLabel value="private" control={<Radio />} label="Private" />
        </RadioGroupStyled>
      </FormField>
      <SubmitButton
        variant="contained"
        onClick={handleSubmit}
      >
        Continue
      </SubmitButton>
    </FormContainer>
  );
};

export default ListForm;
