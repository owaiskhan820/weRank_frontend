import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, useTheme, useMediaQuery, styled } from '@mui/material';
import Logo from '../../images/werankLogo.png';  
import { IoIosCreate } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { IoNotificationsSharp } from "react-icons/io5";
import { FaBookmark } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

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

export const LeftSidebar = ({ onSelectionChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const navigate = useNavigate();

  const handleMenuItemClick = (path) => {
    navigate(path);
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
          { text: 'Profile', icon: <IoPersonSharp size="1.25em"/>,view: 'profile' },
          { text: 'Create List', icon: <IoIosCreate size="1.25em" />, view: 'createList'},
          { text: 'Notifications', icon: <IoNotificationsSharp size="1.25em" />, view: 'notifications' },
          { text: 'Watchlist', icon: <FaBookmark  /> },
          // ... other menu items
        ].map((item, index) => (
          <StyledListItem
            button 
            key={item.text}
            onClick={() => onSelectionChange(item.view)}
          >
            <ListItemIcon><IconStyle>{item.icon}</IconStyle></ListItemIcon>
            <ListItemText primary={item.text} />
          </StyledListItem>
        ))}
      </List>
    </StyledDrawer>
  );
}
