import { gql, useQuery, useMutation } from '@apollo/client';

import type { AccountSortField as SortField } from './AccountListView';
import type { Account } from '../../../shared/types';
import type { SortDirection } from '../../shared/providers/ListViewContext';

interface GetAccountsResponse {
  accounts: {
    items: Account[];
    total: number;
  };
}

interface GetAccountsVariables {
  sortField?: SortField;
  sortDirection?: SortDirection;
  page?: number;
  pageSize?: number;
}

interface GetAccountResponse {
  account: Account;
}

interface GetAccountVariables {
  id: string;
}

interface DeleteAccountResponse {
  deleteAccount: boolean;
}

interface DeleteAccountVariables {
  id: string;
}

// GraphQL Queries
export const GET_ACCOUNTS = gql`
  query GetAccounts($sortField: String, $sortDirection: String, $page: Int, $pageSize: Int) {
    accounts(sortField: $sortField, sortDirection: $sortDirection, page: $page, pageSize: $pageSize) {
      items {
        id
        name
        type
        industry
        website
        primaryContactId
      }
      total
    }
  }
`;

export const GET_ACCOUNT = gql`
  query GetAccount($id: ID!) {
    account(id: $id) {
      id
      name
      type
      industry
      website
      primaryContactId
      billingAddress {
        street
        city
        state
        zip
        country
      }
      contacts {
        id
        firstName
        lastName
        email
        phone
        title
      }
    }
  }
`;

export const DELETE_ACCOUNT = gql`
  mutation DeleteAccount($id: ID!) {
    deleteAccount(id: $id)
  }
`;

// Custom hooks for accounts
export function useAccounts(sortField?: SortField, sortDirection?: SortDirection, page: number = 1, pageSize: number = 5) {
  const { data, loading, error } = useQuery<GetAccountsResponse, GetAccountsVariables>(GET_ACCOUNTS, {
    variables: {
      sortField,
      sortDirection,
      page,
      pageSize,
    },
  });

  return {
    accounts: data?.accounts.items || [],
    totalCount: data?.accounts.total || 0,
    loading,
    error,
  };
}

export function useAccount(id: string) {
  const { data, loading, error } = useQuery<GetAccountResponse, GetAccountVariables>(GET_ACCOUNT, {
    variables: { id },
    skip: !id,
  });

  return {
    account: data?.account,
    loading,
    error,
  };
}

export function useDeleteAccount() {
  const [deleteAccount, { loading }] = useMutation<DeleteAccountResponse, DeleteAccountVariables>(DELETE_ACCOUNT, {
    refetchQueries: ['GetAccounts'],
  });

  const handleDelete = async (id: string) => {
    try {
      await deleteAccount({ variables: { id } });
      return true;
    } catch (error) {
      console.error('Error deleting account:', error);
      return false;
    }
  };

  return {
    deleteAccount: handleDelete,
    loading,
  };
}
