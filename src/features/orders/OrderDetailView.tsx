import { PageContainer } from '@toolpad/core/PageContainer';
import { useParams } from 'react-router-dom';

import OrderDetailApplet from './OrderDetailApplet';
import OrderItemListApplet from './OrderItemListApplet';

export default function OrderDetailView() {
  const { orderId } = useParams<{ orderId: string }>();

  if (!orderId) {
    return (
      <PageContainer
        title='Order Details'
        breadcrumbs={[{ title: 'Home', path: '/' }, { title: 'Orders', path: '/orders' }, { title: 'Order Details' }]}
      >
        <div>Invalid order ID</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title={`Order ${orderId}`}
      breadcrumbs={[{ title: 'Home', path: '/' }, { title: 'Orders', path: '/orders' }, { title: `Order ${orderId}` }]}
    >
      <OrderDetailApplet orderId={orderId} />
      <OrderItemListApplet orderId={orderId} />
    </PageContainer>
  );
}
