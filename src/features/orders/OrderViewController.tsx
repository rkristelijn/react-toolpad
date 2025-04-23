import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import OrderListApplet from './OrderListApplet';

// Define types for sort options
export type SortField = 'id' | 'account.name' | 'orderDate' | 'status' | 'total';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField | null;
  direction: SortDirection;
}

export default function OrderViewController() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: (searchParams.get('sortField') as SortField) || null,
    direction: (searchParams.get('sortDirection') as SortDirection) || 'asc',
  });

  // Handle sort request from the OrderListApplet
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

  return <OrderListApplet onSort={handleSort} sortConfig={sortConfig} onResetSort={resetSort} />;
}
