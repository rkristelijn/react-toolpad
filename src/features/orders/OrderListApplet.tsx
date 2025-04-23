import { Box, Paper } from '@mui/material';
import { useCallback, useState } from 'react';

import type { SxProps, Theme } from '@mui/material/styles';

import { OrderList } from './OrderList';
import { OrderListToolbar } from './OrderListToolbar';
import { useOrders, useUpdateOrder, useDeleteOrder } from './order-service';
import { useListView } from '../../shared/providers/ListViewContext';
import type { Order } from '../../../shared/types';
import type { OrderSortField } from './types';

export interface OrderListAppletProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export default function OrderListApplet({ className, sx }: OrderListAppletProps) {
  const { selectedItemId, onSelectItem, sortField, sortDirection, onSortFieldChange, onSortDirectionChange } = useListView<
    OrderSortField,
    Order
  >();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const { orders, totalCount, loading, error, refetch } = useOrders(sortField, sortDirection, page);
  const { updateOrder } = useUpdateOrder();
  const { deleteOrder } = useDeleteOrder();

  const handleRefresh = async () => {
    try {
      await refetch();
    } catch (err) {
      console.error('Failed to refresh orders:', err);
    }
  };

  const handleSortChange = useCallback(
    (field: OrderSortField) => {
      if (field === sortField) {
        onSortDirectionChange(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        onSortFieldChange(field);
      }
      setPage(1); // Reset to first page when sorting changes
    },
    [sortField, sortDirection, onSortFieldChange, onSortDirectionChange]
  );

  const handleSelectOrder = useCallback(
    (order: Order) => {
      onSelectItem(order);
    },
    [onSelectItem]
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1); // Reset to first page when page size changes
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

  if (loading || error) {
    return null;
  }

  return (
    <Box component={Paper} className={className} sx={sx}>
      <OrderListToolbar onRefresh={handleRefresh} />
      <OrderList
        orders={orders}
        totalCount={totalCount}
        page={page}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        selectedOrderId={selectedItemId}
        onSelectOrder={handleSelectOrder}
        sortField={sortField}
        sortDirection={sortDirection}
        onSortChange={handleSortChange}
        onCancelOrder={handleCancelOrder}
        onDeleteOrder={handleDeleteOrder}
      />
    </Box>
  );
}
