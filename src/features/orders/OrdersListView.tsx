import { Refresh } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { useOrders, useUpdateOrder, useDeleteOrder } from './order-service';

import type { Order } from '../../../shared/types';

export default function OrdersListView() {
  const { orders, loading, error, refetch } = useOrders();
  const { updateOrder } = useUpdateOrder();
  const { deleteOrder } = useDeleteOrder();

  const handleRefresh = async () => {
    try {
      await refetch();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to refresh orders:', err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'warning.main';
      case 'processing':
        return 'info.main';
      case 'completed':
        return 'success.main';
      case 'cancelled':
        return 'error.main';
      default:
        return 'text.primary';
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    try {
      await updateOrder(orderId, { status: 'cancelled' });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to cancel order:', err);
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    try {
      await deleteOrder(orderId);
    } catch (err) {
      console.error('Failed to delete order:', err);
    }
  };

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
        <Alert severity='error'>Error loading orders: {error.message}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
        <Typography variant='h5'>Orders</Typography>
        <Button startIcon={<Refresh />} onClick={handleRefresh}>
          Refresh
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align='right'>Total</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order: Order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <Link component={RouterLink} to={`/orders/${order.id}`} color='primary'>
                    {order.id}
                  </Link>
                </TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Typography color={getStatusColor(order.status)}>{order.status}</Typography>
                </TableCell>
                <TableCell align='right'>${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Button
                    size='small'
                    color='warning'
                    onClick={() => handleCancelOrder(order.id)}
                    disabled={order.status === 'cancelled' || order.status === 'completed'}
                  >
                    Cancel
                  </Button>
                  <Button size='small' color='error' onClick={() => handleDeleteOrder(order.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
