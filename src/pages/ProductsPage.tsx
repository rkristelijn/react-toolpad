import { PageContainer } from '@toolpad/core';

import ProductsListView from 'features/products/ProductsListView';

export default function ProductsPage() {
  return (
    <PageContainer title='Products' breadcrumbs={[{ title: 'Home', path: '/' }, { title: 'Products' }]}>
      <ProductsListView />
    </PageContainer>
  );
}
