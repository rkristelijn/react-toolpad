import { Box, Alert, Paper, Typography, Link, Grid, CircularProgress } from '@mui/material';

import type { SxProps, Theme } from '@mui/material/styles';
import { useAccount } from './account-service';

interface AccountDetailAppletProps {
  accountId: string;
  className?: string;
  sx?: SxProps<Theme>;
}

export default function AccountDetailApplet({ accountId, className, sx }: AccountDetailAppletProps) {
  const { account, loading, error } = useAccount(accountId);

  if (loading) {
    return (
      <Box display='flex' justifyContent='center' p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity='error'>Error loading account: {error.message}</Alert>
      </Box>
    );
  }

  if (!account) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity='warning'>Account not found</Alert>
      </Box>
    );
  }

  return (
    <Paper className={className} sx={{ mb: 2, p: 2, ...sx }}>
      <Typography variant='h6' gutterBottom>
        Account Information
      </Typography>
      <Grid container spacing={2}>
        <Grid sx={{ gridColumn: 'span 6' }}>
          <Box sx={{ mb: 2 }}>
            <Typography>
              <strong>Name:</strong> {account.name}
            </Typography>
            <Typography>
              <strong>Type:</strong> {account.type}
            </Typography>
            <Typography>
              <strong>Industry:</strong> {account.industry}
            </Typography>
            <Typography>
              <strong>Website:</strong>{' '}
              <Link href={account.website} target='_blank' rel='noopener noreferrer'>
                {account.website}
              </Link>
            </Typography>
          </Box>
        </Grid>
        <Grid sx={{ gridColumn: 'span 6' }}>
          <Typography variant='subtitle1' gutterBottom>
            Billing Address
          </Typography>
          {account.billingAddress ? (
            <>
              <Typography>{account.billingAddress.street}</Typography>
              <Typography>
                {account.billingAddress.city}, {account.billingAddress.state} {account.billingAddress.zip}
              </Typography>
              <Typography>{account.billingAddress.country}</Typography>
            </>
          ) : (
            <Typography color='text.secondary'>No billing address set</Typography>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}
