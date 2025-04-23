import { ApolloProvider } from '@apollo/client';
import { Stack } from '@mui/material';
import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import ContactListApplet from './ContactListApplet';
import { client } from '../../shared/providers/apollo';
import { ListViewProvider } from '../../shared/providers/ListViewContext';

import type { ContactSortField } from './types';
import type { Contact } from '../../../shared/types';

export default function ContactListView() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const selectedContactId = searchParams.get('selectedContact') || undefined;

  // Reset URL parameters when coming from a detail view
  useEffect(() => {
    const fromDetailView = location.key === 'default';
    if (fromDetailView) {
      setSearchParams({});
    }
  }, [location, setSearchParams]);

  const handleSelectContact = (contact: Contact | null) => {
    const params = new URLSearchParams(searchParams);
    if (contact?.id) {
      params.set('selectedContact', contact.id);
    } else {
      params.delete('selectedContact');
    }
    setSearchParams(params);
  };

  return (
    <ApolloProvider client={client}>
      <Stack direction='column' height='100%' spacing={2}>
        <ListViewProvider<ContactSortField, Contact> onSelectItem={handleSelectContact} selectedItemId={selectedContactId}>
          <ContactListApplet />
        </ListViewProvider>
      </Stack>
    </ApolloProvider>
  );
}
