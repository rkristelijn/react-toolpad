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
  TablePagination,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import type { SxProps, Theme } from '@mui/material/styles';

import { useProducts } from './product-service';

import type { Product } from '../../../shared/types';

export type SortField = keyof Pick<Product, 'name' | 'price' | 'stock'>;
export type SortDirection = 'asc' | 'desc';

export interface ProductListAppletProps {
  className?: string;
  sx?: SxProps<Theme>;
  onSelectProduct?: (product: Product) => void;
  selectedProductId?: string;
  sortField?: SortField;
  sortDirection?: SortDirection;
  onSortChange?: (field: SortField, direction: SortDirection) => void;
  onResetSort?: () => void;
  page?: number;
  onPageChange?: (page: number) => void;
}

export default function ProductListApplet({
  className,
  sx,
  onSelectProduct,
  selectedProductId,
  sortField,
  sortDirection,
  onSortChange,
  onResetSort,
  page = 0,
  onPageChange,
}: ProductListAppletProps) {
  const pageSize = 5;
  const { data, loading, error } = useProducts({
    sortField,
    sortDirection,
    page,
    pageSize,
  });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const products = data?.items ?? [];
  const total = data?.total ?? 0;

  // Auto-select first product when no product is selected and products are loaded
  useEffect(() => {
    if (!selectedProductId && products.length > 0 && onSelectProduct) {
      onSelectProduct(products[0]);
    }
  }, [products, selectedProductId, onSelectProduct]);

  const handleSortClick = (field: SortField) => {
    if (!onSortChange) return;

    const newDirection: SortDirection = field === sortField && sortDirection === 'asc' ? 'desc' : 'asc';
    onSortChange(field, newDirection);
  };

  const handleProductClick = (product: Product) => {
    // Store current URL parameters in state for when we return
    navigate(`/products/${product.id}`, {
      state: {
        fromList: true,
        returnParams: searchParams.toString(),
      },
    });
  };

  const handlePageChange = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  if (loading) {
    return <Typography>Loading products...</Typography>;
  }

  if (error) {
    return <Typography color='error'>Error loading products: {error.message}</Typography>;
  }

  if (!data) return null;

  return (
    <Box className={className} sx={sx}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
        <Typography variant='h5'>Products</Typography>
        {sortField && (
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
                  active={sortField === 'name'}
                  direction={sortField === 'name' ? sortDirection : 'asc'}
                  onClick={() => handleSortClick('name')}
                >
                  Name
                  {sortField === 'name' ? (
                    <Box component='span' sx={visuallyHidden}>
                      {sortDirection === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortField === 'price'}
                  direction={sortField === 'price' ? sortDirection : 'asc'}
                  onClick={() => handleSortClick('price')}
                >
                  Price
                  {sortField === 'price' ? (
                    <Box component='span' sx={visuallyHidden}>
                      {sortDirection === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortField === 'stock'}
                  direction={sortField === 'stock' ? sortDirection : 'asc'}
                  onClick={() => handleSortClick('stock')}
                >
                  Stock
                  {sortField === 'stock' ? (
                    <Box component='span' sx={visuallyHidden}>
                      {sortDirection === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product: Product) => (
              <TableRow
                key={product.id}
                onClick={() => onSelectProduct?.(product)}
                selected={product.id === selectedProductId}
                hover
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>
                  <Link component='button' onClick={() => handleProductClick(product)} color='primary'>
                    {product.name}
                  </Link>
                </TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.stock}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component='div'
        count={total}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={pageSize}
        rowsPerPageOptions={[5]}
      />
    </Box>
  );
}
