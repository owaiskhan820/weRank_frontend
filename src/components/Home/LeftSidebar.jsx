import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, useTheme, makeStyles, useMediaQuery } from '@material-ui/core';
import Logo from '../../images/werankLogo.png';  
import { IoIosCreate } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { IoNotificationsSharp } from "react-icons/io5";
import { FaBookmark } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";
import { useNavigate } from 'react-router-dom';



const drawerWidth = 250; // Width of the sidebar

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      backgroundColor: '#FFFFFF', // A light background will contrast well with the theme color
    },
  },
  icon: {
    color: '#0A6A69', // Your theme color
    
  },
  // Add more styles as needed...
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
  logo: {
    width: '100%', // Adjust size to fit your logo aspect ratio
    padding: theme.spacing(1), // Add some padding if needed
    // You can add more styles for the logo
  },
  listItem: {
    '&:hover': {
      backgroundColor: '#0A6A69', // Use the theme color for hover state
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white, // Change text and icon color on hover
      },
    },
  },
  // Responsive drawer
  drawerPaper: {
    width: drawerWidth,
   
  },
}));



export const LeftSidebar = ({onSelectionChange}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs')); // Determine if the current viewport is mobile size
  const navigate = useNavigate();

  const handleMenuItemClick = (path) => {
    navigate(path); 
  };

  return (
    <Drawer
      className={classes.drawer}
      variant={isMobile ? 'temporary' : 'permanent'}
      classes={{ paper: classes.drawerPaper }}
      anchor="left"
      open={!isMobile} // If mobile, control the open state with your own state/logic
      // You can add onClose handler to handle the drawer close event
    >
      <div className={classes.logoContainer}>
        <img src={Logo} alt="Logo" className={classes.logo} />
      </div>
      <List className={classes.list}>
        {[
          { text: 'Home', icon: <FaHome size="1.25em" />,  view: 'feed'},
          { text: 'Profile', icon: <IoPersonSharp size="1.25em"/>,view: 'profile' },
          { text: 'Create List', icon: <IoIosCreate size="1.25em" />, view: 'createList'},
          { text: 'Notifications', icon: <IoNotificationsSharp size="1.25em" /> },
          { text: 'Watchlist', icon: <FaBookmark  /> },
          { text: 'More', icon: <IoIosMore size="1.25em" /> },
        ].map((item, index) => (
          <ListItem
          button 
          key={item.text}
          className={classes.listItem}
          onClick={() => onSelectionChange(item.view)}
          >
            <ListItemIcon className={classes.icon}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} classes={{ primary: classes.icon }} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
