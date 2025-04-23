import { Add, Sort } from '@mui/icons-material';
import { Button, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';

interface AccountListToolbarProps {
  onAddClick?: () => void;
}

export function AccountListToolbar({ onAddClick }: AccountListToolbarProps) {
  return (
    <Toolbar sx={{ pr: { sm: 1, xs: 1 }, pl: { sm: 2 } }}>
      <Typography variant='h6' component='div' sx={{ flex: '1 1 100%' }}>
        Accounts
      </Typography>
      <IconButton>
        <Sort />
      </IconButton>
      <Button variant='contained' startIcon={<Add />} onClick={onAddClick} sx={{ ml: 2 }}>
        Add
      </Button>
    </Toolbar>
  );
}
