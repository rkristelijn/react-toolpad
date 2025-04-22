import { ArrowBack } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { PageContainer } from '@toolpad/core/PageContainer';
import { useNavigate, useParams } from 'react-router-dom';

import ProductDetailApplet from './ProductDetailApplet';

export default function ProductDetailPage() {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();

  const handleBack = () => {
    navigate('/products');
  };

  return (
    <PageContainer
      title='Product Details'
      breadcrumbs={[{ title: 'Home', path: '/' }, { title: 'Products', path: '/products' }, { title: 'Product Details' }]}
    >
      <Box sx={{ p: 2 }}>{productId && <ProductDetailApplet productId={productId} />}</Box>
    </PageContainer>
  );
}
