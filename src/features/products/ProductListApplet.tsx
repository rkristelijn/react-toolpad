import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import type { SxProps, Theme } from '@mui/material/styles';

import { useProducts } from './product-service';

import type { Product } from '../../../shared/types';

export interface ProductListAppletProps {
  className?: string;
  sx?: SxProps<Theme>;
  onSelectProduct?: (product: Product) => void;
  selectedProductId?: string;
}

export default function ProductListApplet({ className, sx, onSelectProduct, selectedProductId }: ProductListAppletProps) {
  const { products, loading, error } = useProducts();

  if (loading) {
    return <Typography>Loading products...</Typography>;
  }

  if (error) {
    return <Typography color='error'>Error loading products: {error.message}</Typography>;
  }

  return (
    <TableContainer component={Paper} className={className} sx={sx}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Stock</TableCell>
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
  );
}
