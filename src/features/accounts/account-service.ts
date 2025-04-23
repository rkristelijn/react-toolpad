import { gql, useQuery, useMutation } from '@apollo/client';

import type { Account } from '../../../shared/types';
import type { SortField, SortDirection } from './AccountListViewController';

interface GetAccountsResponse {
  accounts: Account[];
}

interface GetAccountsVariables {
  sortField?: SortField;
  sortDirection?: SortDirection;
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
  query GetAccounts($sortField: String, $sortDirection: String) {
    accounts(sortField: $sortField, sortDirection: $sortDirection) {
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
      primaryContact {
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
      primaryContact {
        id
        firstName
        lastName
        email
        phone
        title
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
export function useAccounts(variables: GetAccountsVariables) {
  const { data, loading, error, refetch } = useQuery<GetAccountsResponse, GetAccountsVariables>(GET_ACCOUNTS, {
    variables,
    fetchPolicy: 'network-only', // Don't use cache when sorting changes
  });

  return {
    accounts: data?.accounts || [],
    loading,
    error,
    refetch,
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
