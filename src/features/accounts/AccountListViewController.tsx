import { Stack } from '@mui/material';
import { Children, cloneElement, isValidElement, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import AccountListApplet from './AccountListApplet';

import type { Account } from '../../../shared/types';
import type { AccountListAppletProps } from './AccountListApplet';
import type { ReactElement } from 'react';

export type SortField = 'name' | 'type' | 'industry';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField | null;
  direction: SortDirection;
}

export interface AccountListViewControllerProps {
  onSelectAccount?: (account: Account | null) => void;
  selectedAccountId?: string;
  children?: React.ReactNode;
}

export default function AccountListViewController({ onSelectAccount, selectedAccountId, children }: AccountListViewControllerProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: (searchParams.get('sortField') as SortField) || null,
    direction: (searchParams.get('sortDirection') as SortDirection) || 'asc',
  });

  // Sync sortConfig with URL parameters when they change
  useEffect(() => {
    const urlSortField = searchParams.get('sortField') as SortField;
    const urlSortDirection = searchParams.get('sortDirection') as SortDirection;

    setSortConfig({
      field: urlSortField || null,
      direction: urlSortDirection || 'asc',
    });
  }, [searchParams]);

  // Handle sort request from the AccountListApplet
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
    // Clear the selected account when sorting changes
    params.delete('selectedAccount');
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

  return (
    <Stack direction='column' spacing={2}>
      {Children.map(children, child => {
        if (isValidElement<AccountListAppletProps>(child) && child.type === AccountListApplet) {
          const appletChild = child as ReactElement<AccountListAppletProps>;
          return cloneElement(appletChild, {
            onSortChange: handleSort,
            ...(sortConfig.field && { sortField: sortConfig.field }),
            sortDirection: sortConfig.direction,
            onResetSort: resetSort,
            onSelectAccount,
            selectedAccountId,
          });
        }
        return child;
      })}
    </Stack>
  );
}
