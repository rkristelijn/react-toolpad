import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Link,
  TableSortLabel,
  Box,
  Button,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useEffect } from 'react';

import type { SxProps, Theme } from '@mui/material/styles';

import { useProducts } from './product-service';

import type { SortConfig, SortField } from './ProductListViewController';
import type { Product } from '../../../shared/types';

export interface ProductListAppletProps {
  className?: string;
  sx?: SxProps<Theme>;
  onSelectProduct?: (product: Product) => void;
  selectedProductId?: string;
  onSort?: (field: SortField) => void;
  sortConfig?: SortConfig;
  onResetSort?: () => void;
}

export default function ProductListApplet({
  className,
  sx,
  onSelectProduct,
  selectedProductId,
  onSort,
  sortConfig = { field: null, direction: 'asc' },
  onResetSort,
}: ProductListAppletProps) {
  const { products, loading, error } = useProducts(sortConfig.field, sortConfig.direction);

  // Auto-select first product when no product is selected and products are loaded
  useEffect(() => {
    if (!selectedProductId && products.length > 0 && onSelectProduct) {
      onSelectProduct(products[0]);
    }
  }, [products, selectedProductId, onSelectProduct]);

  const handleSortClick = (field: SortField) => {
    if (onSort) {
      onSort(field);
    }
  };

  if (loading) {
    return <Typography>Loading products...</Typography>;
  }

  if (error) {
    return <Typography color='error'>Error loading products: {error.message}</Typography>;
  }

  return (
    <Box className={className} sx={sx}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
        <Typography variant='h5'>Products</Typography>
        {sortConfig.field && (
          <Button size='small' onClick={onResetSort}>
            Clear Sorting
          </Button>
        )}
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.field === 'id'}
                  direction={sortConfig.field === 'id' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSortClick('id')}
                >
                  ID
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.field === 'name'}
                  direction={sortConfig.field === 'name' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSortClick('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.field === 'price'}
                  direction={sortConfig.field === 'price' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSortClick('price')}
                >
                  Price
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.field === 'stock'}
                  direction={sortConfig.field === 'stock' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSortClick('stock')}
                >
                  Stock
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map(product => (
              <TableRow
                key={product.id}
                onClick={() => onSelectProduct?.(product)}
                selected={product.id === selectedProductId}
                hover
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>
                  <Link component={RouterLink} to={`/products/${product.id}`} color='primary'>
                    {product.id}
                  </Link>
                </TableCell>
                <TableCell>
                  <Typography variant='body1' component='div'>
                    {product.name}
                  </Typography>
                </TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.stock}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
