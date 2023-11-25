import React from 'react';
import { Tabs, Tab } from '@material-ui/core';

const FeedTab = ({ selectedTab, onTabChange }) => {
  return (
    <Tabs value={selectedTab} onChange={(event, newValue) => onTabChange(newValue)} variant="fullWidth">
      <Tab label="For you" />
      <Tab label="Following" />
    </Tabs>
  );
};

export default FeedTab;