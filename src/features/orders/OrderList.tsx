import {
  Link,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
  Paper,
  TablePagination,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import type { Order } from '../../../shared/types';
import type { OrderSortField } from './types';
import type { SortDirection } from '../../shared/providers/ListViewContext';

interface OrderListProps {
  orders: Order[];
  totalCount: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  selectedOrderId: string | null;
  onSelectOrder: (order: Order) => void;
  sortField: OrderSortField | null;
  sortDirection: SortDirection;
  onSortChange: (field: OrderSortField) => void;
  onCancelOrder: (orderId: string) => void;
  onDeleteOrder: (orderId: string) => void;
}

export function OrderList({
  orders,
  totalCount,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  selectedOrderId,
  onSelectOrder,
  sortField,
  sortDirection,
  onSortChange,
  onCancelOrder,
  onDeleteOrder,
}: OrderListProps) {
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

  const handlePageChange = (_: unknown, newPage: number) => {
    onPageChange(newPage + 1); // Convert from 0-based to 1-based
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onPageSizeChange(parseInt(event.target.value, 10));
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortField === 'id'}
                  direction={sortField === 'id' ? sortDirection : 'asc'}
                  onClick={() => onSortChange('id')}
                >
                  Order ID
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortField === 'account.name'}
                  direction={sortField === 'account.name' ? sortDirection : 'asc'}
                  onClick={() => onSortChange('account.name')}
                >
                  Customer
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortField === 'orderDate'}
                  direction={sortField === 'orderDate' ? sortDirection : 'asc'}
                  onClick={() => onSortChange('orderDate')}
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortField === 'status'}
                  direction={sortField === 'status' ? sortDirection : 'asc'}
                  onClick={() => onSortChange('status')}
                >
                  Status
                </TableSortLabel>
              </TableCell>
              <TableCell align='right'>
                <TableSortLabel
                  active={sortField === 'total'}
                  direction={sortField === 'total' ? sortDirection : 'asc'}
                  onClick={() => onSortChange('total')}
                >
                  Total
                </TableSortLabel>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order: Order) => (
              <TableRow
                key={order.id}
                selected={order.id === selectedOrderId}
                onClick={() => onSelectOrder(order)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>
                  <Link component={RouterLink} to={`/orders/${order.id}`} color='primary'>
                    {order.id}
                  </Link>
                </TableCell>
                <TableCell>{order.account?.name}</TableCell>
                <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Typography color={getStatusColor(order.status)}>{order.status}</Typography>
                </TableCell>
                <TableCell align='right'>${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Button
                    size='small'
                    color='warning'
                    onClick={e => {
                      e.stopPropagation();
                      onCancelOrder(order.id);
                    }}
                    disabled={order.status === 'cancelled' || order.status === 'completed'}
                  >
                    Cancel
                  </Button>
                  <Button
                    size='small'
                    color='error'
                    onClick={e => {
                      e.stopPropagation();
                      onDeleteOrder(order.id);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component='div'
        count={totalCount}
        page={page - 1} // Convert to 0-based for MUI
        rowsPerPage={pageSize}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handlePageSizeChange}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </>
  );
}
