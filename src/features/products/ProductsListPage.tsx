import { Box } from '@mui/material';
import { useState } from 'react';

import ProductDetailApplet from './ProductDetailApplet';
import ProductListApplet from './ProductListApplet';

import type { Product } from './types';

export default function ProductsListPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <Box sx={{ display: 'flex', gap: 2, height: '100%', p: 2 }}>
      <Box sx={{ flex: '1 1 50%', overflow: 'auto' }}>
        <ProductListApplet onSelectProduct={setSelectedProduct} selectedProductId={selectedProduct?.id} />
      </Box>
      <Box sx={{ flex: '1 1 50%', overflow: 'auto' }}>{selectedProduct && <ProductDetailApplet productId={selectedProduct.id} />}</Box>
    </Box>
  );
}
