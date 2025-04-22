import { Box } from '@mui/material';
import { PageContainer } from '@toolpad/core/PageContainer';
import { useParams } from 'react-router-dom';

import ProductDetailApplet from './ProductDetailApplet';

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();

  return (
    <PageContainer
      title='Product Details'
      breadcrumbs={[{ title: 'Home', path: '/' }, { title: 'Products', path: '/products' }, { title: 'Product Details' }]}
    >
      <Box sx={{ p: 2 }}>{productId && <ProductDetailApplet productId={productId} />}</Box>
    </PageContainer>
  );
}
