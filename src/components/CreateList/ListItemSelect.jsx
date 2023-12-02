import React, { useState } from 'react';
import { Box, Button, styled } from '@mui/material';
import WikipediaSearch from './WikipediaSearch'; // Assuming you use the same search component
import { createNewList } from '../../api/CreateList/createList';
import { useSelector } from 'react-redux';
import ListCreatedSuccess from './ListCreatedSuccess';

// Styled components
const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  padding: theme.spacing(1, 4),
  margin: `${theme.spacing(2)}px auto ${theme.spacing(2)}px`,
  display: 'block',
}));

const ButtonContainer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
});

const ListItemSelection = ({ selectedCategory, description, visibility, title }) => {
  const { token, user } = useSelector((state) => state.auth);
  const [selectedItems, setSelectedItems] = useState([]);
  const categoryId = selectedCategory._id;
  const userId = user._id;
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const formatListItems = (items) => items.map(item => ({ name: item.title }));

  const handlePublish = async () => {
    const listData = {
      title,
      userId,
      categoryId,
      description,
      visibility,
      listItems: formatListItems(selectedItems),
    };

    try {
      console.log(listData.listItems);
      await createNewList(listData, token);
      setShowSuccessModal(true);
    } catch (error) {
      console.log("Error while publishing list", error);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <Box>
      <WikipediaSearch
        setSelectedItems={setSelectedItems}
        selectedItems={selectedItems || []}
        category={selectedCategory.categoryName}
      />
      {showSuccessModal && (
        <ListCreatedSuccess
          open={showSuccessModal}
          handleClose={handleCloseModal}
        />
      )}
      <ButtonContainer>
        <SubmitButton variant="contained" onClick={handlePublish}>
          Publish
        </SubmitButton>
      </ButtonContainer>
    </Box>
  );
};

export default ListItemSelection;