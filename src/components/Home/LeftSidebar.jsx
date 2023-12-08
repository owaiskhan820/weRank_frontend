import React, {useState} from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, useTheme, useMediaQuery, styled } from '@mui/material';
import Logo from '../../images/werankLogo.png';  
import { IoIosCreate } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { IoNotificationsSharp } from "react-icons/io5";
import { FaBookmark } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/authSlice';

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
  },
}));

export const LeftSidebar = ({ onSelectionChange, onProfileSelected }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const user  = useSelector((state)=> state.auth.user)
  const userId = user._id
  const dispatch = useDispatch();
  const navigate = useNavigate();



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
      // Add onClose handler if needed
    >
      <LogoContainer>
        <LogoImage src={Logo} alt="Logo" />
      </LogoContainer>
      <List>
        {[
          { text: 'Home', icon: <FaHome size="1.25em" />, view: 'feed' },
          { text: 'Profile', icon: <IoPersonSharp size="1.25em"/>, action: handleProfileClick },
          { text: 'Create List', icon: <IoIosCreate size="1.25em" />, view: 'createList'},
          { text: 'Notifications', icon: <IoNotificationsSharp size="1.25em" />, view: 'notifications' },
          { text: 'Watchlist', icon: <FaBookmark  /> },
          { text: 'Logout', icon: <IoLogOut size="1.25em" />, action: handleLogout },
          // ... other menu items
        ].map((item, index) => (
          <StyledListItem
          button 
          key={item.text}
          onClick={item.action || (() => onSelectionChange(item.view))}
        >
          <ListItemIcon><IconStyle>{item.icon}</IconStyle></ListItemIcon>
          <ListItemText primary={item.text} />
        </StyledListItem>
      ))}
    </List>
  </StyledDrawer>
  );
}
