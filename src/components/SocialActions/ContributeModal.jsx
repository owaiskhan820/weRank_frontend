import React, { useState } from 'react';
import { Modal, Box, Typography, Divider, IconButton, List, ListItem, ListItemText, Paper, Button } from '@mui/material';
import { IoMdCloseCircle } from "react-icons/io";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { rearrangeList } from '../../api/SocialActions/SocialActions';
import { useSelector } from 'react-redux'; // Import useSelector



const ContributeModal = ({ title, items, isOpen, onClose }) => {
    console.log(items)
    const token = useSelector((state) => state.auth.token); // Replace 'state.auth.userId' with the actual path in your Redux store

    const [leftItems, setLeftItems] = useState(items);
    const [rightItems, setRightItems] = useState([]);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%', // Adjust as needed
        height: 'auto', // Adjust as needed
        bgcolor: 'white', // Set the background to white
        boxShadow: 24,
        p: 2,
        borderRadius: 2, // Rounded edges
        display: 'flex',
        flexDirection: 'column',
        outline: 'none', // Remove focus outline
    };


    const handleItemClick = (item, isRight) => {
        if (isRight) {
            setLeftItems([...leftItems, item]);
            setRightItems(rightItems.filter(i => i.id !== item.id));
        } else {
            setRightItems([...rightItems, item]);
            setLeftItems(leftItems.filter(i => i.id !== item.id));
        }
    };
    

    // Function to reorder the rightItems array
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    // Handler when drag ends
    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const rightItemsNewOrder = reorder(
            rightItems,
            result.source.index,
            result.destination.index
        );

        setRightItems(rightItemsNewOrder);
    };

    const handleClose = async ()  => {
        onClose(false);
    };

    const handleSubmit = async () => {
        const rearrangedListItems = rightItems.map(item => ({
            _id: item.label._id, // Assuming the _id is stored under label object
            name: item.label.name
        }));
    
        try {
            const successMessage = await rearrangeList(title._id, rearrangedListItems, token);
            console.log(successMessage);
            alert("List updated successfully!"); // Success alert
            onClose(true); // Close modal on success
        } catch (error) {
            console.error('Error:', error);
            alert("You have already contributed to this list."); // Alert user about the error
            onClose(true); // Optionally close modal on error
        }
    };

    // renderItem function adapted from file 2
    const renderItem = (item, index, isRight) => (
        <ListItem button key={item.id} onClick={() => handleItemClick(item, isRight)}>
            <ListItemText primary={`${index + 1}. ${item.label}`} />
        </ListItem>
    );

    return (
        <Modal open={isOpen} onClose={handleClose}>
            
            <DragDropContext onDragEnd={onDragEnd}>
                <Paper sx={style} elevation={5}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" p={1}>
                        <Typography variant="h6" component="h2" sx={{ flex: 1, textAlign: 'center' }}>
                            {title.title}
                        </Typography>
                        <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
                            <IoMdCloseCircle />
                        </IconButton>
                    </Box>
                    <Divider />
                    <Box display="flex" flexGrow={1}>
                        {/* Left Section */}
                        <Box width="50%" bgcolor="#f7f7f7" p={2} borderRadius="4px 0 0 4px">
                        <List>
                            {leftItems.map((item, index) => renderItem(item, index, false))}
                        </List>
                            
                        </Box>

                        <Divider orientation="vertical" flexItem />
                        {/* Right Section */}
                        <Droppable droppableId="droppableRight">
                            {(provided, snapshot) => (
                                <Box
                                    ref={provided.innerRef}
                                    width="50%"
                                    bgcolor="#f0f0f0"
                                    p={2}
                                    borderRadius="0 4px 4px 0"
                                    {...provided.droppableProps}
                                >
                                    <List>
                                        {rightItems.map((item, index) => (
                                            <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                                {(provided, snapshot) => (
                                                    <ListItem
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={provided.draggableProps.style}
                                                    >
                                                        <ListItemText primary={`${index + 1}. ${item.label}`} />
                                                    </ListItem>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </List>
                                </Box>
                            )}
                        </Droppable>
                    </Box>
                    <Box display="flex" justifyContent="flex-end" p={2}>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={handleSubmit}
                            disabled={leftItems.length !== 0} // Disabled if leftItems is not empty
                        >
                            Submit
                        </Button>
                    </Box>
                </Paper>
            </DragDropContext>
        </Modal>
    );
};

export default ContributeModal;