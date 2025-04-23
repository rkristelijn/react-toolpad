import { Box } from '@mui/material';
import { PageContainer } from '@toolpad/core/PageContainer';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import ProductDetailApplet from './ProductDetailApplet';

export default function ProductDetailView() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handlePopState = () => {
      // If we came from the list and have return parameters, use them
      if (location.state?.fromList && location.state?.returnParams) {
        navigate(`/products?${location.state.returnParams}`, { replace: true });
      } else {
        // Otherwise just go back to the products list
        navigate('/products', { replace: true });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      // window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate, location.state]);

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
