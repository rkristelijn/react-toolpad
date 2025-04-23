// React imports
import { ApolloProvider } from '@apollo/client';
import { Stack } from '@mui/material';
import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

// MUI imports

// Local imports
import AccountListApplet from './AccountListApplet';
import AccountDetailApplet from './AccountDetailApplet';
import { client } from '../../shared/providers/apollo';
import { ListViewProvider } from '../../shared/providers/ListViewContext';

import type { Account } from '../../../shared/types';

export type AccountSortField = 'name' | 'type' | 'industry';

export default function AccountListView() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const selectedAccountId = searchParams.get('selectedAccount') || undefined;

  // Reset URL parameters when coming from a detail view
  useEffect(() => {
    const fromDetailView = location.key === 'default';
    if (fromDetailView) {
      setSearchParams({});
    }
  }, [location, setSearchParams]);

  const handleSelectAccount = (account: Account | null) => {
    const params = new URLSearchParams(searchParams);
    if (account?.id) {
      params.set('selectedAccount', account.id);
    } else {
      params.delete('selectedAccount');
    }
    setSearchParams(params);
  };

  return (
    <ApolloProvider client={client}>
      <Stack direction='column' height='100%' spacing={2}>
        <ListViewProvider<AccountSortField, Account> onSelectItem={handleSelectAccount} selectedItemId={selectedAccountId}>
          <AccountListApplet />
          {selectedAccountId && <AccountDetailApplet accountId={selectedAccountId} />}
        </ListViewProvider>
      </Stack>
    </ApolloProvider>
  );
}
