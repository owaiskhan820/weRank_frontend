import React, { useState, useEffect } from 'react';
import { makeStyles, Paper, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Button } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useSelector } from 'react-redux';
import { getSuggestedUsers } from '../../api/user/User'; // Adjust the import path as 
import { getSuggestedLists } from '../../api/List/List';
import ListIcon from '@material-ui/icons/List'; // Import the list icon from Material-UI icons

const drawerWidth = 240; // The width you want for your right sidebar. Adjust as needed.

const useStyles = makeStyles((theme) => ({
  // Styles for the sidebar sections
  sidebarSection: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    backgroundColor: '#f5f5f5',
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    [theme.breakpoints.down('md')]: {
      display: 'none', // Hide on small screens
    },
  },
  followButton: {
    marginLeft: 'auto',
  },
  verifiedIcon: {
    fontSize: '1rem',
    color: '#1DA1F2',
    marginLeft: theme.spacing(0.5),
  },
  listItem: {
    padding: theme.spacing(1, 0),
  },
  // Style to offset the main content for a fixed AppBar
  toolbarMargin: theme.mixins.toolbar,
  // Style for the AppBar
  appBar: {
    zIndex: theme.zIndex.drawer + 1, // Ensure the AppBar stays above the sidebars
  },
  // Style for the main content with appropriate padding
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingTop: `calc(${theme.mixins.toolbar.minHeight}px + ${theme.spacing(1)}px)`, // Adjust top padding to match AppBar height
    [theme.breakpoints.up('md')]: {
      paddingLeft: drawerWidth, // Left padding for the right sidebar on larger screens
    },
  },
  // Style for the right sidebar, positioned to the right
  rightSidebar: {
    width: drawerWidth,
    position: 'fixed',
    right: 0,
    top: 0,
    height: '100vh',
    [theme.breakpoints.down('md')]: {
      display: 'none', // Hide on small screens
    },
  },
}));

export const RightSidebar = () => {
    const classes = useStyles();
    const userId = useSelector(state => state.auth.user._id); // Fetching the user ID from Redux
    const [displayedUsers, setDisplayedUsers] = useState([]);
    const [displayedLists, setDisplayedLists] = useState([]);

    useEffect(() => {
        // Fetch Users
        const fetchUsers = async () => {
            try {
                const data = await getSuggestedUsers(userId);
                setDisplayedUsers(data.users.slice(0, 3)); // Display only the first 3 users initially
            } catch (error) {
                console.error('Error fetching suggested users:', error);
            }
        };

        // Fetch Lists
        const fetchLists = async () => {
            try {
                const data = await getSuggestedLists(userId);
                setDisplayedLists(data.slice(0, 7)); // Display only the first 3 lists initially
            } catch (error) {
                console.error('Error fetching suggested lists:', error);
            }
        };

        fetchUsers();
        fetchLists();
    }, [userId]);

    return (
        <div>
            {/* Who to Follow Section */}
            <Paper className={classes.sidebarSection}>
                <Typography variant="h6" gutterBottom>
                    Who to follow
                </Typography>
                <List>
                    {displayedUsers.map((user, index) => (
                        <ListItem key={index} className={classes.listItem}>
                            <ListItemAvatar>
                                <Avatar src={user.profilePicture || '/path-to-default-avatar.png'} />
                            </ListItemAvatar>
                            <ListItemText primary={user.username} secondary={`@${user.username.replace(/\s+/g, '')}`} />
                            <Button variant="outlined" size="small" className={classes.followButton}>
                                Follow
                            </Button>
                        </ListItem>
                    ))}
                    <ListItem button>
                        <ListItemText primary="Show more" />
                    </ListItem>
                </List>
            </Paper>

            {/* Lists You Might Like Section */}
            <Paper className={classes.sidebarSection} style={{ marginTop: '16px' }}>
        <Typography variant="h6" gutterBottom>
          Lists You Might Like
        </Typography>
        <List>
          {displayedLists.map((list, index) => (
            <ListItem key={index} className={classes.listItem}>
              <ListItemAvatar>
                {/* Use the list icon for each list item */}
                <Avatar>
                  <ListIcon />
                </Avatar>
              </ListItemAvatar>
              {/* Display the list title and username below it */}
              <ListItemText primary={list.listTitle} secondary={`@${list.username}`} />
            </ListItem>
          ))}
          <ListItem button>
            <ListItemText primary="Show more" />
          </ListItem>
        </List>
      </Paper>
        </div>
    );
};

export default RightSidebar;
