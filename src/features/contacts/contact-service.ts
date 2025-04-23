import { gql, useQuery, useMutation } from '@apollo/client';

import type { ContactSortField } from './types';
import type { Contact } from '../../../shared/types';
import type { SortDirection } from '../../shared/providers/ListViewContext';

interface GetContactsResponse {
  contacts: {
    items: Contact[];
    total: number;
  };
}

interface GetContactsVariables {
  sortField?: ContactSortField;
  sortDirection?: SortDirection;
  page?: number;
  pageSize?: number;
}

interface GetContactResponse {
  contact: Contact;
}

interface GetContactVariables {
  id: string;
}

interface DeleteContactResponse {
  deleteContact: boolean;
}

interface DeleteContactVariables {
  id: string;
}

// GraphQL Queries
export const GET_CONTACTS = gql`
  query GetContacts($sortField: String, $sortDirection: String, $page: Int, $pageSize: Int) {
    contacts(sortField: $sortField, sortDirection: $sortDirection, page: $page, pageSize: $pageSize) {
      items {
        id
        firstName
        lastName
        email
        phone
        title
        accountId
        account {
          id
          name
        }
      }
      total
    }
  }
`;

export const GET_CONTACT = gql`
  query GetContact($id: ID!) {
    contact(id: $id) {
      id
      firstName
      lastName
      email
      phone
      title
      accountId
      address {
        street
        city
        state
        zip
        country
      }
      account {
        id
        name
        type
        industry
      }
    }
  }
`;

export const DELETE_CONTACT = gql`
  mutation DeleteContact($id: ID!) {
    deleteContact(id: $id)
  }
`;

// Custom hooks for contacts
export function useContacts(sortField?: ContactSortField, sortDirection?: SortDirection, page: number = 1, pageSize: number = 5) {
  const { data, loading, error } = useQuery<GetContactsResponse, GetContactsVariables>(GET_CONTACTS, {
    variables: {
      sortField,
      sortDirection,
      page,
      pageSize,
    },
  });

  return {
    contacts: data?.contacts.items || [],
    totalCount: data?.contacts.total || 0,
    loading,
    error,
  };
}

export function useContact(id: string) {
  const { data, loading, error } = useQuery<GetContactResponse, GetContactVariables>(GET_CONTACT, {
    variables: { id },
    skip: !id,
  });

  return {
    contact: data?.contact,
    loading,
    error,
  };
}

export function useDeleteContact() {
  const [deleteContact, { loading }] = useMutation<DeleteContactResponse, DeleteContactVariables>(DELETE_CONTACT, {
    refetchQueries: ['GetContacts'],
  });

  const handleDelete = async (id: string) => {
    try {
      await deleteContact({ variables: { id } });
      return true;
    } catch (error) {
      console.error('Error deleting contact:', error);
      return false;
    }
  };

  return {
    deleteContact: handleDelete,
    loading,
  };
}
