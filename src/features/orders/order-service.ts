import { gql, useQuery, useMutation } from '@apollo/client';

import type { SortField, SortDirection } from './OrderViewController';
import type { UpdateOrderInput } from '../../../shared/types';

// GraphQL Queries and Mutations
const GET_ORDERS = gql`
  query GetOrders($sortField: String, $sortDirection: String) {
    orders(sortField: $sortField, sortDirection: $sortDirection) {
      id
      customerName
      orderDate
      status
      total
      items {
        id
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

const GET_ORDER = gql`
  query GetOrder($id: ID!) {
    order(id: $id) {
      id
      customerName
      orderDate
      status
      total
      items {
        id
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

const CREATE_ORDER = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      id
      customerName
      status
      total
    }
  }
`;

const UPDATE_ORDER = gql`
  mutation UpdateOrder($id: ID!, $input: UpdateOrderInput!) {
    updateOrder(id: $id, input: $input) {
      id
      status
    }
  }
`;

const DELETE_ORDER = gql`
  mutation DeleteOrder($id: ID!) {
    deleteOrder(id: $id)
  }
`;

// Custom hooks for orders
export function useOrders(sortField?: SortField | null, sortDirection?: SortDirection) {
  const { data, loading, error, refetch } = useQuery(GET_ORDERS, {
    variables: {
      sortField: sortField || undefined,
      sortDirection: sortDirection || undefined,
    },
    fetchPolicy: 'network-only', // Don't use cache when sorting changes
  });

  return {
    orders: data?.orders || [],
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

export function useCreateOrder() {
  const [createOrder, { loading }] = useMutation(CREATE_ORDER, {
    refetchQueries: [{ query: GET_ORDERS }],
  });

  return {
    createOrder: (input: { customerName: string; items: Array<{ productId: string; quantity: number }> }) =>
      createOrder({ variables: { input } }),
    loading,
  };
}

export function useUpdateOrder() {
  const [updateOrderMutation] = useMutation(UPDATE_ORDER, {
    refetchQueries: ['GetOrders', 'GetOrder'],
  });

  const updateOrder = async (id: string, input: UpdateOrderInput) => {
    await updateOrderMutation({
      variables: { id, input },
    });
  };

  return { updateOrder };
}

export function useDeleteOrder() {
  const [deleteOrderMutation] = useMutation(DELETE_ORDER, {
    refetchQueries: ['GetOrders'],
  });

  const deleteOrder = async (id: string) => {
    await deleteOrderMutation({
      variables: { id },
    });
  };

  return { deleteOrder };
}
