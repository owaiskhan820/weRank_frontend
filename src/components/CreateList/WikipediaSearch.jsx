import React, { useState, useEffect } from 'react';
import { List, ListItem, TextField, Paper, Chip, styled } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Styled components
const SearchContainer = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const SearchResultList = styled(List)(({ theme }) => ({
  width: '100%',
  maxHeight: 300,
  overflowY: 'auto',
  marginTop: theme.spacing(1),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
}));

const SearchInput = styled(TextField)({
  width: '100%',
  marginBottom: '16px',
});

const StyledListItem = styled(ListItem)(({ theme }) => ({
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const DraggableContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(1),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  margin: theme.spacing(1),
  padding: theme.spacing(0.5),
  justifyContent: 'center',
  '& .MuiChip-deleteIcon': {
    color: '#fff',
  },
}));

const WikipediaSearch = ({ setSelectedItems, selectedItems, category }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        performSearch();
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, category]);

  const performSearch = async () => {
    if (!searchTerm) {
        setSearchResults([]);
        return;
      }
    
      const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(` ${searchTerm}+" "+ ${category}`)}&format=json&origin=*`;
    
      try {
        const response = await fetch(searchUrl);
        const data = await response.json();
    
        // Just set the search results without combining with images
        setSearchResults(data.query.search);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
  };

  const handleResultSelect = (result) => {
    setSelectedItems(prevItems => [...prevItems, result]);
    setSearchTerm(''); // Clear search input
    setSearchResults([]); // Clear search results
  };

  const onDragEnd = (result) => {
    // Drag end logic
    if (!result.destination) {
        return;
      }
      const items = Array.from(selectedItems);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
  
      setSelectedItems(items);
  };

  const placeholder = `Search for ${category}`;
  return (
    <SearchContainer>
      <SearchInput
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        variant="outlined"
      />
      <SearchResultList>
        {searchResults.map((result, index) => (
          <StyledListItem key={index} onClick={() => handleResultSelect(result)}>
            {result.title}
          </StyledListItem>
        ))}
      </SearchResultList>
      <h2>Selected Items</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {selectedItems.map((item, index) => (
                <Draggable key={item.pageid} draggableId={item.pageid.toString()} index={index}>
                  {(provided) => (
                    <DraggableContainer
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <StyledChip
                        label={item.title}
                        onDelete={() => {
                          setSelectedItems(selectedItems.filter((i) => i.pageid !== item.pageid));
                        }}
                      />
                    </DraggableContainer>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </SearchContainer>
  );
};

export default WikipediaSearch;