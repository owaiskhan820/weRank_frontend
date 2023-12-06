import React, { useState, useEffect } from 'react';
import { Paper, Typography, List, ListItem, ListItemAvatar, Avatar, TextField, Button, IconButton, Menu, MenuItem, styled } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { fetchCommentsByListId, postComment, deleteComment } from '../../api/SocialActions/SocialActions'; // Include deleteComment
import { useSelector } from 'react-redux'; // Import useSelector

// Styled components
const AvatarStyled = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}));

const CommentPaper = styled(Paper)(({ theme }) => ({
  maxHeight: '100%',
  padding: theme.spacing(2),
}));

const CommentBubble = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  backgroundColor: '#f0f0f0',
  borderRadius: '16px',
  marginLeft: theme.spacing(2),
  marginBottom: theme.spacing(1),
  maxWidth: '80%',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '-10px',
    width: '0',
    height: '0',
    border: '5px solid transparent',
    borderRightColor: '#f0f0f0',
    transform: 'translateY(-50%)',
  },
}));

const ListItemStyled = styled(ListItem)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  width: '100%',
}));

const InputArea = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: theme.spacing(2),
}));

const PostButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));


const CommentWindow = ({ isVisible, listId, token, onCommentAdded}) => {
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const loggedInUserId = useSelector((state) => state.auth.user); // Replace 'state.auth.userId' with the actual path in your Redux store

  useEffect(() => {
    const fetchComments = async () => {
      console.log(loggedInUserId._id)
      if (isVisible) {
        try {
          const fetchedComments = await fetchCommentsByListId(listId, token);
          setComments(fetchedComments);
        } catch (error) {
          console.error("Error fetching comments:", error);
        }
      }
    };

    fetchComments();
  }, [isVisible, listId, token]);

  const handlePostComment = async () => {
    if (!newCommentText.trim()) return;
    try {
      const addedComment = await postComment(listId, newCommentText, token);
      setComments([...comments, addedComment]);
      setNewCommentText('');
      onCommentAdded(listId)
    } catch (error) {
      console.error('Error posting new comment:', error);
    }
  };

  const handleClick = (event, commentId) => {
    setAnchorEl(event.currentTarget);
    setSelectedCommentId(commentId);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    if (selectedCommentId) {
      await deleteComment(selectedCommentId, token);
      setComments(comments.filter(comment => comment._id !== selectedCommentId));
      handleClose();
    }
  };

  return (
    <CommentPaper>
      <List>
        {comments.map((comment) => (
          <ListItemStyled key={comment._id}>
            <ListItemAvatar>
              <AvatarStyled>{comment.userId.username[0]}</AvatarStyled>
            </ListItemAvatar>
            <CommentBubble>
              <Typography variant="subtitle2">{comment.userId.username}</Typography>
              <Typography>{comment.text}</Typography>
              <Typography variant="caption" color="textSecondary">
                {new Date(comment.date).toLocaleString()}
              </Typography>
              {comment.userId._id === loggedInUserId._id && (
                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={(e) => handleClick(e, comment._id)}
                  size="small"
                  style={{ marginLeft: 'auto' }} // Aligns the button to the right
                >
                  <MoreVertIcon />
                </IconButton>
              )}
            </CommentBubble>
          </ListItemStyled>
        ))}
      </List>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
      <InputArea>
        <TextField
          label="Write a comment..."
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          margin="normal"
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
        />
        <PostButton
          variant="contained"
          color="primary"
          onClick={handlePostComment}
        >
          Post Comment
        </PostButton>
      </InputArea>
    </CommentPaper>
  );
  
};

export default CommentWindow;
