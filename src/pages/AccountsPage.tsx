import { Container } from '@mui/material';
import AccountListView from '../features/accounts/AccountListView';

export default function AccountsPage() {
  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <AccountListView />
    </Container>
  );
}
