import { Stack } from '@mui/material';
import { useState } from 'react';

import ProductDetailApplet from './ProductDetailApplet';
import ProductListViewController from './ProductListViewController';

import type { Product } from '../../../shared/types';

export default function ProductsListView() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <Stack direction='column' height='100%' spacing={2}>
      <ProductListViewController onSelectProduct={setSelectedProduct} selectedProductId={selectedProduct?.id} />

      {selectedProduct && <ProductDetailApplet productId={selectedProduct.id} />}
    </Stack>
  );
}
