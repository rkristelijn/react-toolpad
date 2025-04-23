import { Stack } from '@mui/material';
import { Children, cloneElement, isValidElement, useEffect } from 'react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import ProductListApplet from './ProductListApplet';

import type { ProductListAppletProps } from './ProductListApplet';
import type { Product } from '../../../shared/types';

// Define types for sort options
export type SortField = 'name' | 'price' | 'stock';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField | null;
  direction: SortDirection;
}

export interface ProductListViewControllerProps {
  onSelectProduct?: (product: Product) => void;
  selectedProductId?: string;
  children?: React.ReactNode;
}

export default function ProductListViewController({ onSelectProduct, selectedProductId, children }: ProductListViewControllerProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: (searchParams.get('sortField') as SortField) || null,
    direction: (searchParams.get('sortDirection') as SortDirection) || 'asc',
  });
  const [page, setPage] = useState(Number(searchParams.get('page')) || 0);

  // Sync sortConfig with URL parameters when they change
  useEffect(() => {
    const urlSortField = searchParams.get('sortField') as SortField;
    const urlSortDirection = searchParams.get('sortDirection') as SortDirection;
    const urlPage = searchParams.get('page');

    setSortConfig({
      field: urlSortField || null,
      direction: urlSortDirection || 'asc',
    });

    // Always update page state, defaulting to 0 if not in URL
    setPage(urlPage !== null ? Number(urlPage) : 0);
  }, [searchParams]);

  // Handle sort request from the ProductListApplet
  const handleSort = (field: SortField) => {
    let newDirection: SortDirection = 'asc';

    // If we're already sorting by this field, toggle the direction
    if (sortConfig.field === field) {
      newDirection = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    }

    const newSortConfig: SortConfig = {
      field,
      direction: newDirection,
    };

    // Update state
    setSortConfig(newSortConfig);

    // Update URL with new sort parameters
    const params = new URLSearchParams(searchParams);
    if (newSortConfig.field) {
      params.set('sortField', newSortConfig.field);
      params.set('sortDirection', newSortConfig.direction);
    } else {
      params.delete('sortField');
      params.delete('sortDirection');
    }
    // Clear the selected product when sorting changes
    params.delete('selectedProduct');
    setSearchParams(params);
  };

  // Reset sorting
  const resetSort = () => {
    setSortConfig({ field: null, direction: 'asc' });
    const params = new URLSearchParams(searchParams);
    params.delete('sortField');
    params.delete('sortDirection');
    setSearchParams(params);
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    // Clear the selected product when changing pages
    params.delete('selectedProduct');
    setSearchParams(params);
  };

  return (
    <Stack direction='column' spacing={2}>
      {Children.map(children, child => {
        if (isValidElement(child) && child.type === ProductListApplet) {
          return cloneElement(child as React.ReactElement<ProductListAppletProps>, {
            onSortChange: handleSort,
            ...(sortConfig.field && { sortField: sortConfig.field }),
            sortDirection: sortConfig.direction,
            onResetSort: resetSort,
            onSelectProduct,
            selectedProductId,
            page,
            onPageChange: handlePageChange,
          });
        }
        return child;
      })}
    </Stack>
  );
}
