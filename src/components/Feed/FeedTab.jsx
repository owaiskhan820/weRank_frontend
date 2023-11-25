// FeedTab.js
import React from 'react';
import { Tabs, Tab, makeStyles } from '@material-ui/core';

// Create a hook for styles
const useStyles = makeStyles((theme) => ({
  tabRoot: {
    backgroundColor: '#fff', // Replace 'green' with the green color you want
    color: '#0A6A69', // This is for the text color
    '&:hover': {
      backgroundColor: '#F2F3F5', // Darken the tab a bit on hover, replace with your color
    },
    '&$tabSelected': {
      backgroundColor: '#0A6A69', // White background for selected tab
      color: '#fff', // Text color for selected tab
    },
  },
  tabSelected: {},
  indicator: {
    backgroundColor: '#fff', // White color for the indicator
  },
}));

const FeedTab = ({ selectedTab, onTabChange }) => {
  const classes = useStyles();

  return (
    <Tabs
      value={selectedTab}
      onChange={onTabChange}
      variant="fullWidth"
      classes={{ root: classes.tabRoot, indicator: classes.indicator }}
      aria-label="feed tabs"
    >
      <Tab classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="For you" />
      <Tab classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Following" />
    </Tabs>
  );
};

export default FeedTab;
