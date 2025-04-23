import { ApolloProvider } from '@apollo/client';
import { Stack } from '@mui/material';
import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import OrderListApplet from './OrderListApplet';
import { client } from '../../shared/providers/apollo';
import { ListViewProvider } from '../../shared/providers/ListViewContext';
import type { Order } from '../../../shared/types';
import type { OrderSortField } from './types';

export default function OrdersListView() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const selectedOrderId = searchParams.get('selectedOrder') || undefined;

  // Reset URL parameters when coming from a detail view
  useEffect(() => {
    const fromDetailView = location.key === 'default';
    if (fromDetailView) {
      setSearchParams({});
    }
  }, [location, setSearchParams]);

  const handleSelectOrder = (order: Order | null) => {
    const params = new URLSearchParams(searchParams);
    if (order?.id) {
      params.set('selectedOrder', order.id);
    } else {
      params.delete('selectedOrder');
    }
    setSearchParams(params);
  };

  return (
    <ApolloProvider client={client}>
      <Stack direction='column' height='100%' spacing={2}>
        <ListViewProvider<OrderSortField, Order> onSelectItem={handleSelectOrder} selectedItemId={selectedOrderId}>
          <OrderListApplet />
        </ListViewProvider>
      </Stack>
    </ApolloProvider>
  );
}
