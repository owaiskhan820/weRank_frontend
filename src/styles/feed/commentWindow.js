import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    avatar: {
      backgroundColor: theme.palette.secondary.main,
    },
    commentPaper: {
      maxHeight: '100%',
      padding: theme.spacing(2),
      
    },
    commentBubble: {
      padding: theme.spacing(1),
      backgroundColor: '#f0f0f0',
      borderRadius: '16px',
      marginLeft: theme.spacing(2), // Adjust space between the avatar and the bubble
      marginBottom: theme.spacing(1), // Space between comment bubbles
      maxWidth: '80%', // Maximum width for the bubble
      '&:after': { // Add a tail to the comment bubble
        content: '""',
        position: 'absolute',
        top: '50%',
        left: '-10px',
        width: '0',
        height: '0',
        border: '5px solid transparent',
        borderRightColor: '#f0f0f0',
        transform: 'translateY(-50%)',
        transformOrigin: '0 0',
      },
    },
    listItem: {
      display: 'flex',
      alignItems: 'flex-start',
      width: '100%', // List item takes full width of the parent
    },
  
    inputArea: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: theme.spacing(2),
    },
    postButton: {
      marginTop: theme.spacing(1),
    },
    // Add more styles as needed
  }));
  
  export default useStyles;
