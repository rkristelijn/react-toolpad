import { PageContainer } from '@toolpad/core';

import ProductsListPage from 'features/products/ProductsListPage';

export default function ProductsPage() {
  return (
    <PageContainer title='Products' breadcrumbs={[{ title: 'Home', path: '/' }, { title: 'Products' }]}>
      <ProductsListPage />
    </PageContainer>
  );
}
