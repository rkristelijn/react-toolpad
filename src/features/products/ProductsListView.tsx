import { Stack } from '@mui/material';
import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import ProductDetailApplet from './ProductDetailApplet';
import ProductListApplet from './ProductListApplet';
import ProductListViewController from './ProductListViewController';

import type { Product } from '../../../shared/types';

export default function ProductsListView() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const selectedProductId = searchParams.get('selectedProduct') || undefined;

  // Reset URL parameters when coming from a detail view
  useEffect(() => {
    const fromDetailView = location.key === 'default';
    if (fromDetailView) {
      setSearchParams({});
    }
  }, [location, setSearchParams]);

  const handleSelectProduct = (product: Product | null) => {
    const params = new URLSearchParams(searchParams);
    if (product?.id) {
      params.set('selectedProduct', product.id);
    } else {
      params.delete('selectedProduct');
    }
    setSearchParams(params);
  };

  return (
    <Stack direction='column' height='100%' spacing={2}>
      <ProductListViewController onSelectProduct={handleSelectProduct} selectedProductId={selectedProductId}>
        <ProductListApplet onSelectProduct={handleSelectProduct} selectedProductId={selectedProductId} />
        {selectedProductId && <ProductDetailApplet productId={selectedProductId} />}
      </ProductListViewController>
    </Stack>
  );
}
