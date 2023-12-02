import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({

  username: {
    fontWeight: 'bold',
  },
  date: {
    display: 'block', // Display on the next line
    fontSize: '0.75rem',
    color: theme.palette.text.secondary,
  },
  listTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  scrollableContainer: {
    maxHeight: 'calc(100vh - 100px)', // Adjust as needed
    overflowY: 'auto',
    // Hide scrollbar (for Webkit/Blink browsers)
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    // Hide scrollbar (for IE, Edge, and Firefox)
    msOverflowStyle: 'none',  // for Internet Explorer, Edge
    scrollbarWidth: 'none',   // for Firefox
  },
}));

export default useStyles;
