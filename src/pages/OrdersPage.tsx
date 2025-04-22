import { useApolloClient } from '@apollo/client';
import { Refresh } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
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

import { useOrders, useUpdateOrder, useDeleteOrder } from '../services/orderService';

import type { Order } from '../services/types';

export default function OrderPage() {
  const { orders, loading, error, refetch } = useOrders();
  const { updateOrder } = useUpdateOrder();
  const { deleteOrder } = useDeleteOrder();
  const client = useApolloClient();

  const handleRefresh = async () => {
    try {
      await refetch();
    } catch (err) {
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
      // eslint-disable-next-line no-console
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
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant='h4'>Orders</Typography>
            <Box>
              <Button variant='outlined' startIcon={<Refresh />} onClick={handleRefresh} sx={{ mr: 1 }}>
                Refresh
              </Button>
              <Button variant='contained' color='primary'>
                New Order
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 2 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align='right'>Total</TableCell>
                    <TableCell align='right'>Actions</TableCell>
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
                        <Typography
                          sx={{
                            color: getStatusColor(order.status),
                            textTransform: 'capitalize',
                          }}
                        >
                          {order.status}
                        </Typography>
                      </TableCell>
                      <TableCell align='right'>${order.total.toFixed(2)}</TableCell>
                      <TableCell align='right'>
                        {order.status !== 'cancelled' && (
                          <Button size='small' color='error' onClick={() => handleCancelOrder(order.id)} sx={{ mr: 1 }}>
                            Cancel
                          </Button>
                        )}
                        <Button size='small' color='error' onClick={() => handleDeleteOrder(order.id)}>
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
