import React from 'react';
import { Grid, Typography } from '@mui/material';

const Profile = ({ profile }) => {
  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={12} md={8} lg={6}>
        <Typography variant="h4" align="center" gutterBottom>
          {profile.Name}'s Profile
        </Typography>
        <Typography variant="body1" gutterBottom>
          Gender: {profile.Gender}
        </Typography>
        {/* Add other profile details here */}
      </Grid>
    </Grid>
  );
};

export default Profile;
