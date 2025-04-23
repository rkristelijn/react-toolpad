import { Stack } from '@mui/material';
import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import AccountDetailApplet from './AccountDetailApplet';
import AccountListApplet from './AccountListApplet';
import AccountListViewController from './AccountListViewController';

import type { Account } from '../../../shared/types';

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
    <Stack direction='column' height='100%' spacing={2}>
      <AccountListViewController onSelectAccount={handleSelectAccount} selectedAccountId={selectedAccountId}>
        <AccountListApplet onSelectAccount={handleSelectAccount} selectedAccountId={selectedAccountId} />
        {selectedAccountId && <AccountDetailApplet accountId={selectedAccountId} />}
      </AccountListViewController>
    </Stack>
  );
}
