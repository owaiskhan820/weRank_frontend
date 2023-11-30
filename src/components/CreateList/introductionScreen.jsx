import React from 'react';
import { Box, Button, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  introContainer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    textAlign: 'center',
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(4),
  },
  introTitle: {
    marginBottom: theme.spacing(2),
    fontWeight: 'bold',
  },
  introText: {
    marginBottom: theme.spacing(4),
  },
  continueButton: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

const IntroductionScreen = ({ onContinue }) => {
  const classes = useStyles();

  return (
    <Box className={classes.introContainer}>
      <Typography variant="h4" className={classes.introTitle}>
        Create a List
      </Typography>
      <Typography variant="subtitle1" className={classes.introText}>
        Put items in a list and rank them to your own opinion.
      </Typography>
      <Button variant="contained" className={classes.continueButton} onClick={onContinue}>
        Continue
      </Button>
    </Box>
  );
};

export default IntroductionScreen;
