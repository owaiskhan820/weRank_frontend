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
  InputLabel
} from '@mui/material';
import { fetchAllCategories } from '../../api/CreateList/createList';
import ListItemSelection from './ListItemSelect'; // Make sure to import the ListItemSelection component
import { useStyles } from '../../styles/CreateList/ListFormStyes';

const ListForm = () => {
  const classes = useStyles();
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
      <Box className={classes.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  if (showListItemSelection) {
    // Pass the collected information as props to the ListItemSelection component
    return (
      <ListItemSelection
        selectedCategory={selectedCategory}
        title={title}
        description={description}
        visibility={visibility}
        // onListComplete={...} // pass a callback function if needed
      />
    );
  }

  return (
    <Box className={classes.formContainer}>
      <Typography variant="h5" className={classes.titleStrip}>
        Create A List
      </Typography>
      <FormControl variant="outlined" className={classes.formField}>
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
      </FormControl>
      <TextField
        label="Title"
        variant="outlined"
        className={classes.formField}
        multiline
        value={title}
        onChange={handleTitleChange}
      />
      <TextField
        label="Description (Optional)"
        variant="outlined"
        className={classes.formField}
        multiline
        rows={4}
        value={description}
        onChange={handleDescriptionChange}
      />
      <FormControl component="fieldset" className={classes.formField}>
        <FormLabel component="legend">Post visibility</FormLabel>
        <RadioGroup
          row
          aria-label="visibility"
          name="visibility"
          className={classes.radioGroup}
          value={visibility}
          onChange={handleVisibilityChange}
        >
          <FormControlLabel value="public" control={<Radio />} label="Public" />
          <FormControlLabel value="private" control={<Radio />} label="Private" />
        </RadioGroup>
      </FormControl>
      <Button
        variant="contained"
        className={classes.submitButton}
        onClick={handleSubmit}
      >
        Continue
      </Button>
    </Box>
  );
};

export default ListForm;
