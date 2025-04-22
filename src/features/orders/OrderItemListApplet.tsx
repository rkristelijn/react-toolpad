import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Link,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import type { SxProps, Theme } from '@mui/material/styles';

import { useOrder } from './order-service';

import type { OrderItem } from '../../../shared/types';

export interface OrderItemListAppletProps {
  orderId: string;
  className?: string;
  sx?: SxProps<Theme>;
}

export default function OrderItemListApplet({ orderId, className, sx }: OrderItemListAppletProps) {
  const { order, loading, error } = useOrder(orderId);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity='error'>Error loading order items: {error.message}</Alert>
      </Box>
    );
  }

  if (!order || !order.items || order.items.length === 0) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity='info'>No items found for this order</Alert>
      </Box>
    );
  }

  return (
    <Box className={className} sx={sx}>
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
              {order.items.map((item: OrderItem) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {item.product ? (
                      <Link component={RouterLink} to={`/products/${item.product.id}`} color='primary'>
                        {item.product.name}
                      </Link>
                    ) : (
                      'Unknown Product'
                    )}
                  </TableCell>
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
  );
}
