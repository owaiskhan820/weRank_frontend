// FeedItemStyles.js
import { styled } from '@mui/material/styles';
import { Card, Typography, Box, CardHeader, CardContent } from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  marginBottom: theme.spacing(2),
  border: '1px solid #e0e0e0', // subtle border for the card
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // slight shadow for depth
  borderRadius: theme.shape.borderRadius, // rounded corners
  overflow: 'hidden', // ensures the child components don't overflow the card's border-radius
  // ... other styles you want for the card
}));

export const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  // Add styles for the card header
  // Example:
  paddingBottom: 0, // Remove padding below the header if desired
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  // Add styles for the card content
  // Example:
  paddingTop: theme.spacing(1), 
}));

export const Username = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
}));

export const DateText = styled(Typography)(({ theme }) => ({
  display: 'block',
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
}));

export const ListTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: theme.spacing(2),
}));

export const ScoreBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(1), // Adjust to align correctly in the card
    right: theme.spacing(1), // Adjust to align correctly in the card
    backgroundColor: '#0A6A69 !important', // Background color
    color: 'white', // Text color for readability
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(0.5, 2),
    boxShadow: theme.shadows[2],
    zIndex: 1,
  }));

  
export const ItemNumber = styled(Typography)(({ theme }) => ({
    fontWeight: theme.typography.fontWeightBold,
    minWidth: '20px', // Ensure that the width is enough for multi-digit numbers
    paddingRight: theme.spacing(2), // Add some spacing between the number and the text
  }));
  