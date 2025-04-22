import { Box } from '@mui/material';
import { PageContainer } from '@toolpad/core/PageContainer';
import { useParams } from 'react-router-dom';

import ProductDetailApplet from './ProductDetailApplet';

export default function ProductDetailView() {
  const { productId } = useParams<{ productId: string }>();

  if (!productId) {
    return (
      <PageContainer
        title='Product Details'
        breadcrumbs={[{ title: 'Home', path: '/' }, { title: 'Products', path: '/products' }, { title: 'Product Details' }]}
      >
        <div>Invalid product ID</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title={`Product ${productId}`}
      breadcrumbs={[{ title: 'Home', path: '/' }, { title: 'Products', path: '/products' }, { title: `Product ${productId}` }]}
    >
      <Box sx={{ p: 2 }}>
        <ProductDetailApplet productId={productId} />
      </Box>
    </PageContainer>
  );
}
