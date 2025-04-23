// React imports
import { Box, Paper } from '@mui/material';
import { useCallback } from 'react';

import type { SxProps, Theme } from '@mui/material/styles';

// Local imports
import { ContactList } from './ContactList';
import { ContactListToolbar } from './ContactListToolbar';
import { useListView } from '../../shared/providers/ListViewContext';

import type { ContactSortField } from './types';
import type { Contact } from '../../../shared/types';

export interface ContactListAppletProps {
  className?: string;
  sx?: SxProps<Theme>;
}

export default function ContactListApplet({ className, sx }: ContactListAppletProps) {
  const { selectedItemId, onSelectItem, sortField, sortDirection, onSortFieldChange, onSortDirectionChange } = useListView<
    ContactSortField,
    Contact
  >();

  const handleSortChange = useCallback(
    (field: ContactSortField) => {
      if (field === sortField) {
        onSortDirectionChange(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        onSortFieldChange(field);
      }
    },
    [sortField, sortDirection, onSortFieldChange, onSortDirectionChange]
  );

  const handleSelectContact = useCallback(
    (contact: Contact) => {
      onSelectItem(contact);
    },
    [onSelectItem]
  );

  return (
    <Box component={Paper} className={className} sx={sx}>
      <ContactListToolbar />
      <ContactList
        selectedContactId={selectedItemId}
        onSelectContact={handleSelectContact}
        sortField={sortField}
        sortDirection={sortDirection}
        onSortChange={handleSortChange}
      />
    </Box>
  );
}
