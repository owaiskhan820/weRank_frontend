
import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, IconButton } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ExploreIcon from '@material-ui/icons/Explore';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MailIcon from '@material-ui/icons/Mail';
import ListAltIcon from '@material-ui/icons/ListAlt';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import GroupIcon from '@material-ui/icons/Group';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import PersonIcon from '@material-ui/icons/Person';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Logo from '../../images/werankLogo.png';  

const drawerWidth = 250; // Width of the sidebar

const useStyles = makeStyles((theme) => ({
    icon: {
        color: '#000501', // Use any color from the theme
      },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        marginTop: '24px', // Adjust this to match your AppBar's height
        marginLeft: '14px', // Adjust this to match your AppBar's height

        width: drawerWidth,
        boxSizing: 'border-box',
      },
    },
    // ... other styles ...
  }));

export const LeftSidebar = () => {
    const classes = useStyles();

  return (
    <Drawer className={classes.drawer}
            variant="permanent"
            anchor="left"
            >
      <IconButton edge="start" color="inherit" aria-label="open home">
                <img src={Logo} alt="Logo" style={{ width: '280px', marginBottom: '2px' }} />
        </IconButton>
      <List className={classes.list}>
        {[
          { text: 'Home', icon: <HomeIcon className={classes.icon}/> },
          { text: 'Profile', icon: <PersonIcon className={classes.icon}/> },
          { text: 'Notifications', icon: <NotificationsIcon className={classes.icon}/> },
          { text: 'Watchlist', icon: <BookmarkIcon className={classes.icon}/> },
          { text: 'More', icon: <MoreHorizIcon className={classes.icon}/> },
        ].map((item, index) => (
          <ListItem button key={item.text}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

