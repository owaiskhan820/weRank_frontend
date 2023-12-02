import React from 'react';
import { Box, Button, Typography, styled } from '@mui/material';

// Styled components
const IntroContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  textAlign: 'center',
  maxWidth: 600,
  margin: 'auto',
  marginTop: theme.spacing(4),
}));

const IntroTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 'bold',
}));

const IntroText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const ContinueButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const IntroductionScreen = ({ onContinue }) => {
  return (
    <IntroContainer>
      <IntroTitle variant="h4">
        Create a List
      </IntroTitle>
      <IntroText variant="subtitle1">
        Put items in a list and rank them to your own opinion.
      </IntroText>
      <ContinueButton variant="contained" onClick={onContinue}>
        Continue
      </ContinueButton>
    </IntroContainer>
  );
};

export default IntroductionScreen;
