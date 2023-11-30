import React, { useState } from 'react';
import { Box, Button, makeStyles, Typography, TextField } from '@material-ui/core';
import WikipediaSearch from './WikipediaSearch'; // Assuming you use the same search component
import { createNewList } from '../../api/CreateList/createList';
import { useSelector } from 'react-redux';
import ListCreatedSuccess from './ListCreatedSuccess';

const useStyles = makeStyles((theme) => ({
    submitButton: {
        marginTop: theme.spacing(2),
        backgroundColor: theme.palette.primary.main, // Use your theme's primary color
        color: '#fff', // White text color
        '&:hover': {
          backgroundColor: theme.palette.primary.dark, // Darken the button on hover
        },
        // Add padding and other styles as needed
        padding: theme.spacing(1, 4),
        // Center the button by applying margin auto on horizontal sides
        margin: `${theme.spacing(2)}px auto ${theme.spacing(2)}px`,
        display: 'block', // Block display to fill the width of the container
      },
      buttonContainer: {
        display: 'flex', // Set display to flex to use flexbox properties
        justifyContent: 'flex-end', // Align items to the end of the flex container (right side)
      },
}));

const ListItemSelection = ({ selectedCategory, description, visibility, title }) => {
  const {token, user} = useSelector((state) => state.auth);
  const classes = useStyles();
  const [selectedItems, setSelectedItems] = useState([]);
  const categoryId = selectedCategory._id;
  const userId = user._id
  const [showSuccessModal, setShowSuccessModal] = useState(false);


  const formatListItems = (items) => {
    return items.map(item => {
      return { name: item.title }; // Assuming 'title' is the property you want to use as 'name'
    });
  };

  const formattedListItems = formatListItems(selectedItems);



  const handlePublish = async () => {
    // Combine the list info and selected items into one object
    const listData = {
      title,
      userId,
      categoryId, // from props
      description, // from props
      visibility, // from props
      listItems: formattedListItems, // from local state
    };


    try{
      console.log(listData.listItems)
      const response = await createNewList(listData, token ); // replace with your actual API call
      setShowSuccessModal(true)
    } catch{
      console.log("error while publishing list")
    }
    
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false); // Correctly close the modal
  };


  return (
    <Box className={classes.container}>
        <WikipediaSearch 
        setSelectedItems={setSelectedItems} 
        selectedItems={selectedItems || []}   
        category={selectedCategory.categoryName}  
 />
         {showSuccessModal && (
        <ListCreatedSuccess 
          open={showSuccessModal} // Use showSuccessModal as the value for open
          handleClose={handleCloseModal} 
        />
      )}


        <div className={classes.buttonContainer}>
            <Button
                variant="contained"
                className={classes.submitButton}
                onClick={handlePublish}
            >
                Publish
            </Button>
        </div>  
    </Box>
  );
};

export default ListItemSelection;
