import { PageContainer } from '@toolpad/core/PageContainer';

import OrdersListView from '../features/orders/OrdersListView';

export default function OrdersPage() {
  return (
    <PageContainer title='Orders' breadcrumbs={[{ title: 'Home', path: '/' }, { title: 'Orders' }]}>
      <OrdersListView />
    </PageContainer>
  );
}
