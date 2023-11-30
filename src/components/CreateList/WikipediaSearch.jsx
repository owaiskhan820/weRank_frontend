import React, { useState, useEffect } from 'react';
import { List, ListItem, TextField, makeStyles, Paper, Chip } from '@material-ui/core';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const useStyles = makeStyles((theme) => ({
  searchContainer: {
    margin: theme.spacing(2, 0),
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  searchResultList: {
    width: '100%',
    maxHeight: 300,
    overflowY: 'auto',
    marginTop: theme.spacing(1),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
  },
  searchInput: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  listItem: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  selectedItemsList: {
    marginTop: theme.spacing(2),
  },
  chip: {
    backgroundColor: theme.palette.primary.main, // Use your theme's primary color
    color: '#fff', // White text color
    margin: theme.spacing(1), // Add spacing around chips
    padding: theme.spacing(0.5), // Slightly larger padding
    justifyContent: 'center', // Center the text and delete icon
    '& .MuiChip-deleteIcon': { // Style the delete icon
      color: '#fff',
    },
  },
  // Add styles for the draggable container if needed
  draggableContainer: {
    display: 'flex', // Use flex to allow child elements (chips) to be in line
    flexDirection: 'column', // Stack chips vertically
    alignItems: 'center', // Center chips horizontally
    padding: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.divider}`,
  }
}));

const WikipediaSearch = ({setSelectedItems, selectedItems, category}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const classes = useStyles();


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
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleResultSelect = (result) => {
    setSelectedItems(prevItems => [...prevItems, result]);
    setSearchTerm(''); // Clear search input
    setSearchResults([]); // Clear search results
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const items = Array.from(selectedItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSelectedItems(items);
  };
  
    
  
  

  const placeholder = `Search for ${category}`
  return (
    <Paper className={classes.searchContainer}>
      <TextField
        className={classes.searchInput}
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder={placeholder}
        variant="outlined"
      />
      <List className={classes.searchResultList}>
        {searchResults.map((result, index) => (
          <ListItem key={index} className={classes.listItem} onClick={() => handleResultSelect(result)}>
            {result.title}
          </ListItem>
        ))}
      </List>
      <h2>Selected Items</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {selectedItems.length ? (
                selectedItems.map((item, index) => (
                  <Draggable key={item.pageid} draggableId={item.pageid.toString()} index={index}>
                    {(provided) => (
                      <div 
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={classes.draggableContainer}
                      >
                        <Chip
                          label={item.title}
                          className={classes.chip}
                          onDelete={() => {
                            const newSelectedItems = selectedItems.filter(
                              (i) => i.pageid !== item.pageid
                            );
                            setSelectedItems(newSelectedItems);
                          }}
                        />
                      </div>
                    )}
                  </Draggable>
                ))
              ) : (
                <div>Add items to get started...</div>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

    </Paper>
  );
};

export default WikipediaSearch;
