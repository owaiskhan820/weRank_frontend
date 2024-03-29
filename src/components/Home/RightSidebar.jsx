import React, { useState, useEffect } from 'react';
import { Paper, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Button, styled } from '@mui/material';
import { useSelector } from 'react-redux';
import { getSuggestedUsers } from '../../api/user/User';
import { getSuggestedLists } from '../../api/List/List';
import ListIcon from '@mui/icons-material/List';
import FollowButton from '../Follow/FollowButton';

const drawerWidth = 240; // The width for your right sidebar.

// Styled components
const SidebarSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  backgroundColor: '#f5f5f5',
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
    padding: theme.spacing(1, 0),
    '&:hover': {
      cursor: 'pointer', // Add this line to change the cursor on hover
      // ... other hover styles ...
    },
  }));



export const RightSidebar = ({ onUserClick }) => {
    const userId = useSelector(state => state.auth.user._id);
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

    const handleUsernameClick = (clickedUserId) => {
        console.log(clickedUserId)
        onUserClick('profile', clickedUserId);
    };
    
    return (
        <div>
            {/* Who to Follow Section */}
            <SidebarSection>
                <Typography variant="h6" gutterBottom>Who to follow</Typography>
                <List>
                    {displayedUsers.map((user, index) => (
                        <StyledListItem key={index} >
                            <ListItemAvatar onClick={() => handleUsernameClick(user.userId)}>
                                <Avatar src={user.profilePicture || '/path-to-default-avatar.png'} />
                            </ListItemAvatar>
                            <ListItemText primary={user.firstName +" "+user.lastName} secondary={`@${user.username.replace(/\s+/g, '')}`} />
                            <FollowButton targetUserId= {user.userId}>Follow</FollowButton>
                        </StyledListItem> 
                    ))}
                    <StyledListItem button>
                        <ListItemText primary="Show more" />
                    </StyledListItem>
                </List>
            </SidebarSection>

            {/* Lists You Might Like Section */}
            <SidebarSection style={{ marginTop: '16px' }}>
                <Typography variant="h6" gutterBottom>Lists You Might Like</Typography>
                <List>
                    {displayedLists.map((list, index) => (
                        <StyledListItem key={index}>
                            <ListItemAvatar>
                                <Avatar><ListIcon /></Avatar>
                            </ListItemAvatar>
                            <ListItemText 
                            primary={list.listTitle} 
                            secondary={
                                <span 
                                onClick={() => handleUsernameClick(list.userId)}
                                style={{ cursor: 'pointer' }}
                                >
                                @{list.username}
                                </span>
                            } 
                            />
                        </StyledListItem>
                    ))}
                    <StyledListItem button>
                        <ListItemText primary="Show more" />
                    </StyledListItem>
                </List>
            </SidebarSection>
        </div>
    );
};

export default RightSidebar;
