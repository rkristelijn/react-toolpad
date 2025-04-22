import { ArrowBack } from '@mui/icons-material';
import {
  Alert,
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { PageContainer } from '@toolpad/core/PageContainer';
import { useNavigate, useParams } from 'react-router-dom';

import { useOrder } from '../features/orders/order-service';

import type { OrderItem } from '../services/types';

export default function OrderDetailPage() {
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();
  const { order, loading, error } = useOrder(orderId || '');

  const handleBack = () => {
    navigate('/orders');
  };

  if (loading) {
    return (
      <PageContainer
        title='Order Details'
        breadcrumbs={[{ title: 'Home', path: '/' }, { title: 'Orders', path: '/orders' }, { title: 'Order Details' }]}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer
        title='Order Details'
        breadcrumbs={[{ title: 'Home', path: '/' }, { title: 'Orders', path: '/orders' }, { title: 'Order Details' }]}
      >
        <Box sx={{ p: 2 }}>
          <Alert severity='error'>Error loading order: {error.message}</Alert>
        </Box>
      </PageContainer>
    );
  }

  if (!order) {
    return (
      <PageContainer
        title='Order Details'
        breadcrumbs={[{ title: 'Home', path: '/' }, { title: 'Orders', path: '/orders' }, { title: 'Order Details' }]}
      >
        <Box sx={{ p: 2 }}>
          <Alert severity='warning'>Order not found</Alert>
        </Box>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title={`Order #${order.id}`}
      breadcrumbs={[{ title: 'Home', path: '/' }, { title: 'Orders', path: '/orders' }, { title: `Order #${order.id}` }]}
    >
      <Box sx={{ p: 2 }}>
        <Paper sx={{ mb: 2, p: 2 }}>
          <Typography variant='h6' gutterBottom>
            Order Information
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography>
              <strong>Order ID:</strong> {order.id}
            </Typography>
            <Typography>
              <strong>Customer:</strong> {order.customerName}
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

        <Paper sx={{ p: 2 }}>
          <Typography variant='h6' gutterBottom>
            Order Items
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align='right'>Quantity</TableCell>
                  <TableCell align='right'>Price</TableCell>
                  <TableCell align='right'>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.items?.map((item: OrderItem) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.product?.name || 'Unknown Product'}</TableCell>
                    <TableCell align='right'>{item.quantity}</TableCell>
                    <TableCell align='right'>${item.price.toFixed(2)}</TableCell>
                    <TableCell align='right'>${(item.quantity * item.price).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </PageContainer>
  );
}
