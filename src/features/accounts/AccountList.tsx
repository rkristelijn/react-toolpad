import { Box, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, TablePagination } from '@mui/material';
import React, { useState } from 'react';

import { useAccounts } from './account-service';
import { AccountSortField } from './AccountListView';
import { Account } from '../../../shared/types';
import { SortDirection } from '../../shared/providers/ListViewContext';

interface AccountListProps {
  selectedAccountId: string | null;
  onSelectAccount: (account: Account) => void;
  sortField: AccountSortField | null;
  sortDirection: SortDirection;
  onSortChange: (field: AccountSortField) => void;
}

interface HeadCell {
  id: AccountSortField;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  { id: 'name', label: 'Name', numeric: false },
  { id: 'type', label: 'Type', numeric: false },
  { id: 'industry', label: 'Industry', numeric: false },
];

export function AccountList({ selectedAccountId, onSelectAccount, sortField, sortDirection, onSortChange }: AccountListProps) {
  const [page, setPage] = useState(0);
  const pageSize = 5;

  const { accounts, totalCount, loading, error } = useAccounts(sortField || undefined, sortDirection, page + 1, pageSize);

  const handleClick = (account: Account) => {
    onSelectAccount(account);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Box sx={{ p: 2, color: 'error.main' }}>Error loading accounts: {error.message}</Box>;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Table>
        <TableHead>
          <TableRow>
            {headCells.map(headCell => (
              <TableCell
                key={headCell.id}
                align={headCell.numeric ? 'right' : 'left'}
                sortDirection={sortField === headCell.id ? sortDirection : false}
              >
                <TableSortLabel
                  active={sortField === headCell.id}
                  direction={sortField === headCell.id ? sortDirection : 'asc'}
                  onClick={() => onSortChange(headCell.id)}
                >
                  {headCell.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {accounts.map(account => {
            const isSelected = selectedAccountId === account.id;
            return (
              <TableRow hover onClick={() => handleClick(account)} role='button' tabIndex={-1} key={account.id} selected={isSelected}>
                <TableCell>{account.name}</TableCell>
                <TableCell>{account.type}</TableCell>
                <TableCell>{account.industry}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        component='div'
        count={totalCount}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={pageSize}
        rowsPerPageOptions={[5]}
      />
    </Box>
  );
}
