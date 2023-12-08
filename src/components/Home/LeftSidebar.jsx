import React, { useEffect } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, useTheme, useMediaQuery, styled } from '@mui/material';
import Logo from '../../images/werankLogo.png';
import { IoNotificationsSharp, IoPersonSharp, IoLogOut } from "react-icons/io5";
import { IoIosCreate } from "react-icons/io";
import { FaHome, FaBookmark } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/authSlice';
import { fetchUnreadNotifications } from '../../redux/notifications/notificationSlice';

 
const drawerWidth = 250; // Width of the sidebar

// Styled components
const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    backgroundColor: '#FFFFFF',
  },
}));

const IconStyle = styled('div')(({ theme }) => ({
  color: '#0A6A69',
}));

const LogoContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
}));

const LogoImage = styled('img')({
  width: '100%',
  padding: '8px', // Adjust as needed
});

const StyledListItem = styled(ListItem)(({ theme }) => ({
  '&:hover': {
    backgroundColor: '#0A6A69',
    '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
      color: theme.palette.common.white,
    },
    // Correct way to reference another styled component within a rule
    [`& ${IconStyle}`]: {
      color: 'white',
    },
  },
}));

const NotificationCount = styled('span')({
  font: 'bold',
  backgroundColor: 'red',
  color: 'white',
  borderRadius: '50%',
  padding: '2px', // Adjust padding to suit your design
  fontSize: '0.8em', // Adjust font size as needed
  marginLeft: '5px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '20px', // Adjust height and width to make it a circle
  minWidth: '20px',
  lineHeight: '20px', // Align text vertically
});

export const LeftSidebar = ({ onSelectionChange, onProfileSelected }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refreshInterval = 30000; 

  const unreadCount = useSelector(state => state.notifications.unreadCount);

  useEffect(() => {
    console.log("refreshed")
    dispatch(fetchUnreadNotifications());
    
    const intervalId = setInterval(() => {
      dispatch(fetchUnreadNotifications());
    }, refreshInterval);

    return () => clearInterval(intervalId);
  }, [dispatch, refreshInterval]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleProfileClick = () => {
    onProfileSelected();
  };

  return (
    <StyledDrawer
      variant={isMobile ? 'temporary' : 'permanent'}
      anchor="left"
      open={!isMobile}
    >
      <LogoContainer>
        <LogoImage src={Logo} alt="Logo" />
      </LogoContainer>
      <List>
        {[
          { text: 'Home', icon: <FaHome size="1.25em" />, view: 'feed' },
          { text: 'Profile', icon: <IoPersonSharp size="1.25em"/>, action: handleProfileClick },
          { text: 'Create List', icon: <IoIosCreate size="1.25em" />, view: 'createList'},
          { text: 'Notifications', icon: <IoNotificationsSharp size="1.25em" />, view: 'notifications', count: unreadCount },
          { text: 'Watchlist', icon: <FaBookmark size="1.25em" /> },
          { text: 'Logout', icon: <IoLogOut size="1.25em" />, action: handleLogout },
        ].map((item) => (
          <StyledListItem
            button 
            key={item.text}
            onClick={item.action || (() => onSelectionChange(item.view))}
          >
            <ListItemIcon><IconStyle>{item.icon}</IconStyle></ListItemIcon>
            <ListItemText primary={item.text} />
            {item.text === 'Notifications' && item.count > 0 && (
              <NotificationCount>{item.count}</NotificationCount>
            )}
          </StyledListItem>
        ))}
      </List>
    </StyledDrawer>
  );
}
