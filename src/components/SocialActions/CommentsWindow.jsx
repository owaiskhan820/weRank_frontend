import React, { useState, useEffect } from 'react';
import { Paper, Typography, List, ListItem, ListItemAvatar, Avatar, TextField, Button, IconButton, Menu, MenuItem } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { fetchCommentsByListId, postComment, deleteComment } from '../../api/SocialActions/SocialActions'; // Include deleteComment
import useStyles from '../../styles/feed/commentWindow';
import { useSelector } from 'react-redux'; // Import useSelector

const CommentWindow = ({ isVisible, listId, token, onCommentAdded}) => {
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const classes = useStyles();
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
    <Paper className={classes.commentPaper}>
      <List>
        {comments.map((comment) => (
          <ListItem key={comment._id} className={classes.listItem}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>{comment.userId.username[0]}</Avatar>
            </ListItemAvatar>
            <div className={classes.commentBubble}>
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
            </div>
          </ListItem>
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
      <div className={classes.inputArea}>
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
        <Button
          variant="contained"
          color="primary"
          onClick={handlePostComment}
          className={classes.postButton}
        >
          Post Comment
        </Button>
      </div>
    </Paper>
  );
};

export default CommentWindow;
