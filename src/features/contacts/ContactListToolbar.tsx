import { Add } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';

export function ContactListToolbar() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Typography variant='h6'>Contacts</Typography>
      <Button
        variant='contained'
        startIcon={<Add />}
        onClick={() => {
          // TODO: Implement new contact creation
          console.log('Create new contact');
        }}
      >
        New
      </Button>
    </Box>
  );
}
