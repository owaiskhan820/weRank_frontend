import React from 'react';
import { Tabs, Tab, styled } from '@mui/material';

// Styled components
const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    backgroundColor: '#fff', // White color for the indicator
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  backgroundColor: '#fff', // Replace 'green' with the green color you want
  color: '#0A6A69', // This is for the text color
  '&:hover': {
    backgroundColor: '#F2F3F5', // Darken the tab a bit on hover, replace with your color
  },
  '&.Mui-selected': {
    backgroundColor: '#0A6A69', // White background for selected tab
    color: '#fff', // Text color for selected tab
  },
}));

const FeedTab = ({ selectedTab, onTabChange }) => {
  return (
    <StyledTabs
      value={selectedTab}
      onChange={onTabChange}
      variant="fullWidth"
      aria-label="feed tabs"
    >
      <StyledTab label="For you" />
      <StyledTab label="Following" />
    </StyledTabs>
  );
};

export default FeedTab;
