import { Box, CircularProgress, Alert, Paper, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { useOrder } from './order-service';

interface OrderDetailAppletProps {
  orderId: string;
}

export default function OrderDetailApplet({ orderId }: OrderDetailAppletProps) {
  const { order, loading, error } = useOrder(orderId);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity='error'>Error loading order: {error.message}</Alert>
      </Box>
    );
  }

  if (!order) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity='warning'>Order not found</Alert>
      </Box>
    );
  }

  return (
    <Paper sx={{ mb: 2, p: 2 }}>
      <Typography variant='h6' gutterBottom>
        Order Information
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography>
          <strong>Order ID:</strong> {order.id}
        </Typography>
        <Typography>
          <strong>Account:</strong>{' '}
          <Link component={RouterLink} to={`/accounts/${order.accountId}`} color='primary'>
            {order.account?.name || 'Unknown Account'}
          </Link>
        </Typography>
        <Typography>
          <strong>Industry:</strong> {order.account?.industry || 'N/A'}
        </Typography>
        <Typography>
          <strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}
        </Typography>
        <Typography>
          <strong>Status:</strong> {order.status}
        </Typography>
        <Typography>
          <strong>Total:</strong> ${order.total.toFixed(2)}
        </Typography>
      </Box>
    </Paper>
  );
}
