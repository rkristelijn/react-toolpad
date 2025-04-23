import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Box,
  CircularProgress,
  TablePagination,
} from '@mui/material';
import React, { useState } from 'react';

import { useContacts } from './contact-service';

import type { ContactSortField } from './types';
import type { Contact } from '../../../shared/types';
import type { SortDirection } from '../../shared/providers/ListViewContext';

const DEFAULT_SORT_FIELD: ContactSortField = 'lastName';

interface ContactListProps {
  selectedContactId: string | null;
  onSelectContact: (contact: Contact) => void;
  sortField: ContactSortField | null;
  sortDirection: SortDirection;
  onSortChange: (field: ContactSortField) => void;
}

const columns = [
  { field: 'firstName', label: 'First Name' },
  { field: 'lastName', label: 'Last Name' },
  { field: 'email', label: 'Email' },
  { field: 'phone', label: 'Phone' },
] as const;

export function ContactList({ selectedContactId, onSelectContact, sortField, sortDirection, onSortChange }: ContactListProps) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const currentSortField = sortField || DEFAULT_SORT_FIELD;
  const { contacts, totalCount, loading } = useContacts(currentSortField, sortDirection, page + 1, pageSize);

  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return (
      <Box display='flex' justifyContent='center' p={2} minHeight={400}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 400 }}>
      <TableContainer sx={{ flex: 1 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.field}>
                  <TableSortLabel
                    active={currentSortField === column.field}
                    direction={currentSortField === column.field ? sortDirection : 'asc'}
                    onClick={() => onSortChange(column.field)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map(contact => (
              <TableRow
                key={contact.id}
                selected={contact.id === selectedContactId}
                onClick={() => onSelectContact(contact)}
                sx={{ cursor: 'pointer' }}
                hover
              >
                {columns.map(column => (
                  <TableCell key={`${contact.id}-${column.field}`}>{contact[column.field]}</TableCell>
                ))}
              </TableRow>
            ))}
            {contacts.length < pageSize && (
              <TableRow>
                <TableCell colSpan={columns.length} sx={{ height: `${(pageSize - contacts.length) * 53}px`, border: 'none' }} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component='div'
        count={totalCount}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={pageSize}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Box>
  );
}
