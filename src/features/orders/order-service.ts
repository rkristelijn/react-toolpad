import { gql, useQuery, useMutation } from '@apollo/client';

import type { OrderSortField } from './types';
import type { UpdateOrderInput, Order } from '../../../shared/types';
import type { SortDirection } from '../../shared/providers/ListViewContext';

interface GetOrdersResponse {
  orders: {
    items: Order[];
    total: number;
  };
}

interface GetOrdersVariables {
  sortField?: OrderSortField | null;
  sortDirection?: SortDirection;
  page?: number;
  pageSize?: number;
}

// GraphQL Queries and Mutations
export const GET_ORDERS = gql`
  query GetOrders($sortField: String, $sortDirection: String, $page: Int) {
    orders(sortField: $sortField, sortDirection: $sortDirection, page: $page) {
      items {
        id
        accountId
        orderDate
        status
        total
        account {
          id
          name
        }
      }
      total
    }
  }
`;

export const GET_ORDER = gql`
  query GetOrder($id: ID!) {
    order(id: $id) {
      id
      accountId
      orderDate
      status
      total
      account {
        id
        name
        type
        industry
      }
      items {
        id
        productId
        quantity
        price
        product {
          id
          name
          price
        }
      }
    }
  }
`;

export const UPDATE_ORDER = gql`
  mutation UpdateOrder($id: ID!, $input: UpdateOrderInput!) {
    updateOrder(id: $id, input: $input) {
      id
      status
    }
  }
`;

export const DELETE_ORDER = gql`
  mutation DeleteOrder($id: ID!) {
    deleteOrder(id: $id)
  }
`;

export function useOrders(sortField?: OrderSortField | null, sortDirection?: SortDirection, page: number = 1) {
  const { data, loading, error, refetch } = useQuery<GetOrdersResponse, GetOrdersVariables>(GET_ORDERS, {
    variables: {
      sortField,
      sortDirection,
      page: page - 1, // Convert to 0-based for the API
    },
  });

  return {
    orders: data?.orders.items || [],
    totalCount: data?.orders.total || 0,
    loading,
    error,
    refetch,
  };
}

export function useOrder(id: string) {
  const { data, loading, error } = useQuery(GET_ORDER, {
    variables: { id },
    skip: !id,
  });

  return {
    order: data?.order,
    loading,
    error,
  };
}

export function useUpdateOrder() {
  const [updateOrderMutation] = useMutation(UPDATE_ORDER);

  const updateOrder = async (id: string, input: UpdateOrderInput) => {
    try {
      await updateOrderMutation({
        variables: { id, input },
        refetchQueries: ['GetOrders', 'GetOrder'],
      });
      return true;
    } catch (error) {
      console.error('Error updating order:', error);
      return false;
    }
  };

  return { updateOrder };
}

export function useDeleteOrder() {
  const [deleteOrderMutation] = useMutation(DELETE_ORDER);

  const deleteOrder = async (id: string) => {
    try {
      await deleteOrderMutation({
        variables: { id },
        refetchQueries: ['GetOrders'],
      });
      return true;
    } catch (error) {
      console.error('Error deleting order:', error);
      return false;
    }
  };

  return { deleteOrder };
}
