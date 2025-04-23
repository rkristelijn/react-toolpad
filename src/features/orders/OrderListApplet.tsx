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
  TableSortLabel,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import type { SxProps, Theme } from '@mui/material/styles';

import { useOrders, useUpdateOrder, useDeleteOrder } from './order-service';

import type { SortConfig, SortField } from './OrderViewController';
import type { Order } from '../../../shared/types';

export interface OrderListAppletProps {
  className?: string;
  sx?: SxProps<Theme>;
  onSort?: (field: SortField) => void;
  sortConfig?: SortConfig;
  onResetSort?: () => void;
}

export default function OrderListApplet({
  className,
  sx,
  onSort,
  sortConfig = { field: null, direction: 'asc' },
  onResetSort,
}: OrderListAppletProps) {
  const { orders, loading, error, refetch } = useOrders(sortConfig.field, sortConfig.direction);
  const { updateOrder } = useUpdateOrder();
  const { deleteOrder } = useDeleteOrder();

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

  const handleSortClick = (field: SortField) => {
    if (onSort) {
      onSort(field);
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
    <Box className={className} sx={sx}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
        <Typography variant='h5'>Orders</Typography>
        <Button startIcon={<Refresh />} onClick={handleRefresh}>
          Refresh
        </Button>
        {sortConfig.field && (
          <Button size='small' onClick={onResetSort}>
            Clear Sorting
          </Button>
        )}
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.field === 'id'}
                  direction={sortConfig.field === 'id' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSortClick('id')}
                >
                  Order ID
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.field === 'customerName'}
                  direction={sortConfig.field === 'customerName' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSortClick('customerName')}
                >
                  Customer
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.field === 'orderDate'}
                  direction={sortConfig.field === 'orderDate' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSortClick('orderDate')}
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.field === 'status'}
                  direction={sortConfig.field === 'status' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSortClick('status')}
                >
                  Status
                </TableSortLabel>
              </TableCell>
              <TableCell align='right'>
                <TableSortLabel
                  active={sortConfig.field === 'total'}
                  direction={sortConfig.field === 'total' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSortClick('total')}
                >
                  Total
                </TableSortLabel>
              </TableCell>
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
