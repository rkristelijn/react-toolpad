// React imports
import { Box, Paper } from '@mui/material';
import { useCallback } from 'react';

import type { SxProps, Theme } from '@mui/material/styles';

// Local imports
import { AccountList } from './AccountList';
import { AccountListToolbar } from './AccountListToolbar';
import { AccountSortField } from './AccountListView';
import { useListView } from '../../shared/providers/ListViewContext';

import type { Account } from '../../../shared/types';

export interface AccountListAppletProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export default function AccountListApplet({ className, sx }: AccountListAppletProps) {
  const { selectedItemId, onSelectItem, sortField, sortDirection, onSortFieldChange, onSortDirectionChange } = useListView<
    AccountSortField,
    Account
  >();

  const handleSortChange = useCallback(
    (field: AccountSortField) => {
      if (field === sortField) {
        onSortDirectionChange(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        onSortFieldChange(field);
      }
    },
    [sortField, sortDirection, onSortFieldChange, onSortDirectionChange]
  );

  const handleSelectAccount = useCallback(
    (account: Account) => {
      onSelectItem(account);
    },
    [onSelectItem]
  );

  return (
    <Box component={Paper} className={className} sx={sx}>
      <AccountListToolbar />
      <AccountList
        selectedAccountId={selectedItemId}
        onSelectAccount={handleSelectAccount}
        sortField={sortField}
        sortDirection={sortDirection}
        onSortChange={handleSortChange}
      />
    </Box>
  );
}
