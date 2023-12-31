import React from 'react';
import { Card, CardContent, CircularProgress, Typography } from '@material-ui/core';

const LoadingCard = () => (
  <Card>
    <CardContent>
      <CircularProgress />
      <Typography variant="h6" align="center">
        Please wait, we are processing your request...
      </Typography>
    </CardContent>
  </Card>
);

export default LoadingCard;