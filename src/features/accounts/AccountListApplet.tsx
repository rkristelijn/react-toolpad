import {
  Box,
  Alert,
  Paper,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Button,
  Typography,
} from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { Refresh } from '@mui/icons-material';
import { useAccounts, useDeleteAccount } from './account-service';
import type { SortField, SortDirection } from './AccountListViewController';
import type { Account } from '../../../shared/types';

export interface AccountListAppletProps {
  className?: string;
  sx?: SxProps<Theme>;
  onSelectAccount?: (account: Account) => void;
  selectedAccountId?: string;
  sortField?: SortField;
  sortDirection?: SortDirection;
  onSortChange?: (field: SortField) => void;
  onResetSort?: () => void;
}

export default function AccountListApplet({
  className,
  sx,
  onSelectAccount,
  selectedAccountId,
  sortField,
  sortDirection,
  onSortChange,
  onResetSort,
}: AccountListAppletProps) {
  const { accounts, loading, error, refetch } = useAccounts({ sortField, sortDirection });
  const { deleteAccount, loading: deleteLoading } = useDeleteAccount();

  const handleRefresh = () => {
    refetch();
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const success = await deleteAccount(id);
      if (success) {
        refetch();
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  if (loading) {
    return (
      <Box display='flex' justifyContent='center' p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity='error'>Error loading accounts: {error.message}</Alert>
      </Box>
    );
  }

  return (
    <Paper className={className} sx={sx}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant='h5' component='h2'>
          Accounts
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button startIcon={<Refresh />} onClick={handleRefresh}>
            Refresh
          </Button>
          {sortField && (
            <Button size='small' onClick={onResetSort}>
              Clear Sorting
            </Button>
          )}
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortField === 'name'}
                  direction={sortField === 'name' ? sortDirection : 'asc'}
                  onClick={() => onSortChange?.('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortField === 'type'}
                  direction={sortField === 'type' ? sortDirection : 'asc'}
                  onClick={() => onSortChange?.('type')}
                >
                  Type
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortField === 'industry'}
                  direction={sortField === 'industry' ? sortDirection : 'asc'}
                  onClick={() => onSortChange?.('industry')}
                >
                  Industry
                </TableSortLabel>
              </TableCell>
              <TableCell>Website</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map(account => (
              <TableRow
                key={account.id}
                onClick={() => onSelectAccount?.(account)}
                selected={account.id === selectedAccountId}
                hover
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>
                  <RouterLink to={`/accounts/${account.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {account.name}
                  </RouterLink>
                </TableCell>
                <TableCell>{account.type}</TableCell>
                <TableCell>{account.industry}</TableCell>
                <TableCell>
                  <a href={account.website} target='_blank' rel='noopener noreferrer' style={{ color: 'inherit' }}>
                    {account.website}
                  </a>
                </TableCell>
                <TableCell>
                  <Button size='small' color='error' onClick={e => handleDelete(account.id, e)} disabled={deleteLoading}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
